const express = require('express');
const router = express.Router();
const { FetchUserData, FetchUserDataQueryWise, registerUser,updateUser,deleteUserData } = require('../controllers/userDataControllers');

router.route('/').get(FetchUserData);
router.route('/info').get(FetchUserDataQueryWise);
router.route('/registration').post(registerUser);
router.route('/updateuserdata/:id').put(updateUser);
router.route('/removeuserdata/:id').delete(deleteUserData);
module.exports = router;