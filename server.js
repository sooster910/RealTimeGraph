require('dotenv').config()
const express = require('express');

const io_redis = require('socket.io-redis');
const farmhash=require('farmhash');
const cluster = require('cluster');
const port = process.env.PORT || 9001
const socketMain = require('./socketMain');
const socketio = require('socket.io');
const os = require('os');
const numOfProcesses = os.cpus().length;
const upTime = os.uptime(); //needed?
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
const usedMemory  =  totalMemory - freeMemory;
const usedMemoryRate = Math.floor((usedMemory/totalMemory)*100)


const cpus = os.cpus();
// for(var i = 0; i < cpus.length; i++) {
// 	console.log("CPU[" + (i+1) + "]");
// 	console.log("model: " + cpus[i].model);
//     console.log("speed: " + cpus[i].speed);
//     console.log("times:"+ JSON.stringify(cpus[i].times))
// }

if(cluster.isMaster){
    let workers = [];

    let spawn = function(i){

        //grabs paricular fork and calls fork
        workers[i] = cluster.fork();
        workers[i].on('exit', (code, signal)=>{
            console.log('respawning worker',i);
            spawn(i);
        }) 
    }

for(let i=0;i<numOfProcesses;i++){
    spawn(i);
}
const worker_index =(ip,len)=>{
    return farmhash.fingerprint32(ip)%len;

}

const server = net.createServer({ pauseOnConnect: true }, (connection) =>{
    // We received a connection and need to pass it to the appropriate
    // worker. Get the worker for this connection's source IP and pass
    // it the connection.
    let worker = workers[worker_index(connection.remoteAddress, num_processes)];
    worker.send('sticky-session:connection', connection);
});
server.listen(port);
console.log(`Master listening on port ${port}`);
}else{
    const app = express();
    const server = app.listen(0, 'localhost');
    const io = socketio(server);

    //redis adapter configure 
    io.adapter(io_redis({host:'localhost',port:6347}));

    //connect socke to node client
    io.on('connection',(socket)=>{
        socketMain(io, socket);
    });

    // socketMain(io,null);

    process.on('message',(message, connection)=>{
        if(message !== 'sticky-session:connection'){
            return;
        }

        server.emit('connection'.connection);
        
    })
}
