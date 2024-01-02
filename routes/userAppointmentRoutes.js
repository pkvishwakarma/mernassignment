const express =require('express');
const appointmentRouter=express.Router();
const {fetchUserAppointmetData,fetchFilteredUserAppointmentData,registerAppointmentData,updateAppointmentData,deleteAppointmentData}=require('../controllers/userAppointmentController');

appointmentRouter.route('/').get(fetchUserAppointmetData);
appointmentRouter.route('/:id').get(fetchFilteredUserAppointmentData);
appointmentRouter.route('/registrationappointment').post(registerAppointmentData);
appointmentRouter.route('/updateappointment/:id').put(updateAppointmentData);
appointmentRouter.route('/removeappointment/:id').delete(deleteAppointmentData);

module.exports=appointmentRouter;