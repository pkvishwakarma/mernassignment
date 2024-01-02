const mongoose = require('mongoose');
const db = mongoose.connection.useDb('pkvishwadb');
const userSchema = new mongoose.Schema({
    user_id: { type: String },
    username: { type: String },
    password: { type: String },
    email: { type: String},
    mobile: { type: String },
    appointments:[{type:mongoose.Schema.Types.ObjectId,ref:'userappointment'}],
});
// const user=mongoose.model('userdata',userSchema);
const user = db.model('userdata', userSchema);
module.exports = user;