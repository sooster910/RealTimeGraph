



function socketMain(io, socket){
    let uniqueMacAddr;

    //console.log('a socket connected : ',socket);
    console.log('This is socket main')

    socket.on('performanceData',(data)=>{
        console.log('performanceData',data)
    });

    socket.on('initPerformanceData',(data)=>{
        uniqueMacAddr = data.macAddress;
        return checkAndAdd(uniqueMac);
    })

}
module.exports = socketMain;  