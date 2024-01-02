require('dotenv').config();
const express= require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./db/connectionDB');
const PORT=process.env.PORT || 5000;
const user_router=require('./routes/userDataRoutes');
const appointment_routeer=require('./routes/userAppointmentRoutes');
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/uData',user_router);
app.use('/appointment',appointment_routeer);

const start=async()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log(`${PORT} Yes Connected Successfully`);
        })
    }
    catch(error){
        console.log(error);
    }
};

start();