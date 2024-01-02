const mongoose=require('mongoose');
// const db=mongoose.connection.useDb('pkvishwadb');
const appointmentSchema = new mongoose.Schema({
    id: {type:Number},
    title: {type:String},
    date: {type:Date, default:Date.now},
    description:{type:String},
});

const appointment=mongoose.model('userappointment',appointmentSchema);

module.exports=appointment;