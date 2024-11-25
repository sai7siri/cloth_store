const routes = require('express').Router();

const verifyUser = require('../middlewares/verifyUser');

const {createOrder , captureOrder , getAllUserOrders , getOrderDetails} = require('../controllers/orderCont');


routes.post('/createorder' , verifyUser , createOrder);

routes.post('/captureorder' , verifyUser , captureOrder);

routes.get('/getorders' , verifyUser , getAllUserOrders);

routes.get('/getorder/:id' , verifyUser , getOrderDetails);




module.exports = routes;