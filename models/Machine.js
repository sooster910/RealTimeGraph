const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineSchema= new Schema ({
    macAddress :String,
    cpuLoad : Number,
    freeMemory : Number,
    totalMemory :Number,
    usedMemory : Number,
    memoryUseage:Number,
    osType: String,
    upTime: Number,
    cpuModel:String,
    numCores:Number,
    cpuSpeed: Number,

});

module.exports = mongoose.model('Machine', MachineSchema);