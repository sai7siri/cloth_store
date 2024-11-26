
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const cookieParser = require('cookie-parser');
   const path = require("path");
   const dotenv = require('dotenv');

      dotenv.config();
      const app = express();
      
   // routes
   const adminRoutes = require('./routes/productRoutes');

   const userRoutes = require('./routes/userRoutes');
   const cartRoutes = require('./routes/cartRoutes');
   const userAddress = require('./routes/userAddressRoutes');
   const orderRoutes = require('./routes/orderRoutes');


   
   // middlewares
   const _dirname = path.resolve();

   app.use(express.json());
   app.use(express.urlencoded( { extended : true }));
   app.use(cookieParser());
   app.use(cors({
      origin : ['http://localhost:5173'],
      methods : ['GET', 'POST' , 'PUT' , 'DELETE'],
      credentials : true
   }));



   // routes

   app.use('/api/admin' , adminRoutes);

   app.use('/api/user' , userRoutes);
   app.use('/api/user' , cartRoutes);
   app.use('/api/user' , userAddress);
   app.use('/api/order' , orderRoutes);

   app.use(express.static(path.join(_dirname, "/client/dist")));
   app.get( '*' , (_,res)=>{
      res.sendFile(path.resolve(_dirname , "client", "dist", "index.html"));
   })


   // connections 
   const port = process.env.PORT;

   app.listen(port , ()=>{
      console.log(`server is running on port ${port}`)
   });


   mongoose.connect(process.env.MONGO_URI)
   .then( ()=> console.log('DB is connected'))
   .catch( ()=> console.log('connection error or DB is disconnected'))

   app.get('/' , (_, res)=>{
      res.send('<h1> Ecommerce store </h1>')
   })
