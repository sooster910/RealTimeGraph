
const Machine = require('./models/Machine');

function socketMain(io, socket) {
        console.log('socketmain')
    let uniqueMacAddr;
    socket.on('clientAuth', (data) => {
        if (data === 'randomId') {
            socket.join('clients');
        }
        else if(data==='staticId'){
            socket.join('ui');
            
        }else{
            socket.disconnect(true);
        }

    });
    //coming from nodeClient.js then send to react client 
    socket.on('tickData', (data) => {
    
        io.to('ui').emit('tickData', data);
        
    });

    socket.on('initPerformanceData', async (data) => {
        uniqueMacAddr = data.macAddress;
        await saveMacAddress(data).catch(() => console.log('err', err));
    });

}

async function saveMacAddress(data) {
    try {
        let machine = await Machine.findOne({ macAddress: data.uniqueMacAddr });
        if (machine === null) {
            machine = new Machine(data);
            machine.save();
        }
    } catch (err) {
        console.log('err', err)
    }

}
module.exports = socketMain;  