const userAppointment=require('../dataSchema/userAppointmentModel');
const user=require('../dataSchema/userModel');
const mongoose=require('mongoose');

const fetchUserAppointmetData=(req,res)=>{
    try{
        userAppointment.find({}).then((data)=>{
            res.status(200).send(data);
        })
    }
    catch(err){
        console.log(err);
    }
};

const fetchFilteredUserAppointmentData=(req,res)=>{
    const id=req.params.id;
    try{
        userAppointment.find({_id:id}).then((data)=>{
            res.status(200).send(data);
        })
    }
    catch(err){
        console.log(err);
    }
};

const registerAppointmentData=async(req,res)=>{
    try{
        const {id,title,date,description,user_id}=req.body;
        if(!(id && title && date && description && user_id)){
            res.status(400).send('All Input Required');
        }
        const userAppoint= await userAppointment.create({
            id:id,title:title,date:date,description:description
        });
        var objId=new mongoose.Types.ObjectId(userAppoint._id);
        await user.findOneAndUpdate(
            {user_id:user_id},
            {
                $push:{appointments:objId},
            },
            {upsert:false, new:true}
        );
            res.status(200).json({
                message:'Appointment Registered Successfully'
            })
    }
    catch(err){
        console.log(err);
    }
};

const updateAppointmentData=async(req,res)=>{
    const id=req.params.id;
    const updateAppointment=({
        id:req.body.id,
        title:req.body.title,
        date:req.body.date,
        description:req.body.description
    })
    try{
        await userAppointment.findOneAndUpdate(
            {id:id},
            updateAppointment,
        ).then(()=>{
            res.status(200).json({
                data:updateAppointment,
                message:'Appointment Data Updated Successfully'
            })
        })
    }
    catch(err){
        console.log(err);
    }
};

const deleteAppointmentData=async(req,res)=>{
    const id=req.params.id;
    try{
        await userAppointment.findOneAndDelete({_id:id}).then(()=>{
            console.log('Appointment Deleted Successfully');
        });
       const filterdata= await user.findOneAndUpdate(
            {appointments:{_id:id}},
            {$pull:{appointments:{_id:id}}},
            {upsert:false,multi:true},
            );
            console.log(filterdata);
            res.end();
    }
    catch(err){
        console.log(err);
    }
};

module.exports={fetchUserAppointmetData,fetchFilteredUserAppointmentData,registerAppointmentData,updateAppointmentData,deleteAppointmentData};