
const routes = require('express').Router();

const verifyUser = require('../middlewares/verifyUser')

const { addAddress , getAddress , deleteAddress , editAddress} = require('../controllers/addresCont');

routes.post('/address' , verifyUser , addAddress );

routes.delete('/deleteaddress' , verifyUser , deleteAddress);

routes.put('/editaddress/:id' , verifyUser , editAddress);

routes.get('/getaddress' , verifyUser , getAddress);

module.exports = routes;