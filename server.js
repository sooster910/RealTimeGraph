require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 9001
 app.listen(port, ()=>{
    console.log(`${port} is running`)

 });

const os = require('os');

const upTime = os.uptime(); //needed?
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
const usedMemory  =  totalMemory - freeMemory;
const usedMemoryRate = Math.floor((usedMemory/totalMemory)*100)

const cpus = os.cpus();

for(var i = 0; i < cpus.length; i++) {
	console.log("CPU[" + (i+1) + "]");
	console.log("model: " + cpus[i].model);
    console.log("speed: " + cpus[i].speed);
    console.log("times:"+ JSON.stringify(cpus[i].times))
}


