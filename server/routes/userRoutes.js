
const route = require('express').Router();

const { signInUser , SignOutUser, signUpUser, userDashboard, updateUser } = require('../controllers/userCont');

const  verifyUser  = require('../middlewares/verifyUser');

const { multipleUpload, singleUpload } = require('../middlewares/cloudinary');





// user routes

route.post('/signup' , signUpUser);

route.post('/signin' , signInUser);

route.get('/logout' , SignOutUser);

route.put('/update', verifyUser, singleUpload , updateUser);

route.get('/dashboard' ,verifyUser ,  userDashboard);




module.exports = route;


