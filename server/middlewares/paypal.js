
const paypal = require('paypal-rest-sdk');
require('dotenv').config();



// console.log(process.env.PAYPAL_SECRET ,process.env.PAYPAL_ID);

paypal.configure({
   mode : 'sandbox',
   client_id : process.env.PAYPAL_ID,
   client_secret : process.env.PAYPAL_SECRET
});

module.exports = paypal;