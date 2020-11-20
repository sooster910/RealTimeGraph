
const Machine = require('./models/Machine');

function socketMain(io, socket) {
        console.log('socketmain')
    let uniqueMacAddr;
    socket.on('clientAuth', (data) => {
        console.log('clientAuth-server,data')
        if (data === 'randomId') {
            socket.join('clients');
            console.log('joined')
        }
        else if(data==='staticId'){
            socket.join('ui');
            console.log('create');
        }else{
            socket.disconnect(true);
        }

    });
    socket.on('performanceData', (data) => {
        // console.log('performanceData',data)
    });

    socket.on('initPerformanceData', async (data) => {
        uniqueMacAddr = data.macAddress;
        await saveMacAddress(data).catch(() => console.log('err', err));

    })

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