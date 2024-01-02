// const express=require('express');
const user = require('../dataSchema/userModel');

const FetchUserData = (req, res) => {
    try {
        user.find({}).populate("appointments").then((data) => {
            res.send(data);
        })
    }
    catch (error) {
        console.log(error);
    }
};
const FetchUserDataQueryWise = (req, res) => {
    try {
        user.find(req.query).then((data) => {
            res.send(data);
        })
    }
    catch (error) {
        console.log(error);
    }
};

const registerUser =(req, res) => {

    try{
        //Getting user input..
        const {user_id,username,password,email,mobile}=req.body;

        //Validate user Input..
        if(!(user_id && username && password && email && mobile)){
            res.status(400).send('All Input Is Required');
        };
        user.find({$or:[{user_id:user_id},{email:email.toLowerCase()}]}).then((oldUser)=>{
            console.log(oldUser);
            if(oldUser.length>0){
               return res.status(409).send('User Already Exist');
            }

            //create user in our database..
            const userData=user.create({
                user_id:user_id,
                username:username,
                password:password,
                email:email.toLowerCase(),
                mobile:mobile
            }).then((userD)=>{
                console.log(userD);
            })
            res.status(200).json({
                        message: "user created successfully.",
                        status: 200
                    })
        })
    }
    catch (error) {
        res.status(500).json({ message: "somthing went wrong" })
    }
};

const updateUser=async(req, res)=>{
    const id=req.params.id;
    // const {user_id,username,password,email,mobile}=req.body;
    const userUpdatedData=({
        user_id:req.body.user_id,
        username:req.body.username,
        password:req.body.password,
        email:req.body.email.toLowerCase(),
        mobile:req.body.mobile
    });
    try{
        await user.findOneAndUpdate({user_id:id},userUpdatedData).then(()=>{
            console.log(`${userUpdatedData.username} details updated succesffuly`);
            res.end();
        })
    }
    catch(error){
        console.log(error);
    }
};

const deleteUserData=(async(req,res)=>{
    const id=req.params.id;
    try{
        await user.deleteOne({user_id:id});
        res.status(200).json({
            message:'user Deleted Succesfully'
        });
    }
    catch(error){
        console.log(error);
    }
});

module.exports = { FetchUserData, FetchUserDataQueryWise, registerUser, updateUser,deleteUserData };