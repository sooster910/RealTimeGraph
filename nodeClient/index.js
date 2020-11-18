const os  = require('os');
const io = require('socket.io-client') // use client library
const socket = io('http://127.0.0.1:9000');

socket.on('connect',()=>{
    console.log ('connected socket server ')
}) 

function performanceData(){
    return new Promise(async (resolve, reject)=>{
        const cpus = os.cpus();
        // - CPU load (current)
        // - Memory Useage
        //  - free
        const freeMem = os.freemem();
        //  - total
        const totalMem = os.totalmem();
        const usedMem = totalMem - freeMem;
        const memUseage = Math.floor(usedMem/totalMem*100)/100;
        // - OS type
        const osType = os.type() == 'Darwin' ? 'Mac' : os.type();
        // - uptime
        const upTime = os.uptime();
        // - CPU info
        //  - Type
        const cpuModel = cpus[0].model
        //  - Number of Cores
        const numCores = cpus.length;
        //  - Clock Speed
        const cpuSpeed = cpus[0].speed
        const cpuLoad = await getCpuLoad();
        const isActive = true;
        resolve({freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad,isActive})
    })
}

// get all cores of the cpu
function cpuAverage(){
    const cpus = os.cpus();
    // get ms in each mode, BUT this number is since reboot
    // so get it now, and get it in 100ms and compare
    let idleMs = 0;
    let totalMs = 0;
    
    cpus.forEach((core)=>{
        // loop through each property of the current core
        for(type in core.times){
            totalMs += core.times[type];
        }
        idleMs += core.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}

function getCpuLoad(){
    return new Promise((resolve, reject)=>{
        const start = cpuAverage();
        setTimeout(()=>{
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
            // console.log(idleDifference,totalDifference)
            // calc the % of used cpu
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
            resolve(percentageCpu);
        },100)
    })
}