
const routes = require('express').Router();

const verifyUser = require('../middlewares/verifyUser');

const { addToCart , deleteFromCart , cartEmpty, getCart, updateCart} = require('../controllers/cartCont');




   // routes of cart

   routes.post('/addtocart/:id' , verifyUser , addToCart);

   routes.delete('/delete/:id' , verifyUser , deleteFromCart);

   routes.put('/updatecart' , verifyUser , updateCart);

   routes.delete('/cartdelete' , verifyUser , cartEmpty);

   routes.get('/getcart' , verifyUser , getCart);



   module.exports = routes