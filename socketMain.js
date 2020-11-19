
const Machine = require('./models/Machine');

console.log('Machine', Machine)
function socketMain(io, socket) {
    let uniqueMacAddr;

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