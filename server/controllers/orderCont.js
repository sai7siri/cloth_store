const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel")
const paypal = require("../middlewares/paypal");




const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      cartData,
      cartId,
      address,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(400).json({ success: false, message: "un-authorized ! try again" });
    }

    const create_payment_json = {
         intent : 'sale',
         payer : {
            payment_method : 'paypal'
         },
         redirect_urls : {
            return_url : "https://cloth-store-2o8u.onrender.com/paypal-return",
            cancel_url : "https://cloth-store-2o8u.onrender.com/paypal-cancel"
         },

         transactions : [
            {
               item_list : {
                  items : cartData.map( item =>({
                     name : item.title,
                     sku : item.productId,
                     price : item.price.toFixed(2),
                     quantity : item.quantity,
                     currency : 'USD'
                  }))
               },

               amount : {
                  currency : 'USD',
                  total : totalAmount.toFixed(2)
               },

               description : 'description'
            }
         ]
    };


    paypal.payment.create(create_payment_json , async(err , payment)=>{
      if(err){
         return res.status(401).json({success : false , message : 'failed to create the order '})
      }else{
         const newCreateOrder = new orderModel({
            userId : userId,
            cartId,
            cartData,
            address,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
         });

         await newCreateOrder.save();
         const approvalURL = payment.links.find( link => link.rel === 'approval_url').href;
         res.status(201).json({success : true , 
            approvalURL,
            orderId : newCreateOrder._id
         })
      }
    })

  } catch (err) {
   console.log(err);
    res.status(500).json({ success: false, message: "internal error" });
  }
};



const captureOrder = async (req, res) => {
   try {
      const { paymentId , payerId , orderId } = req.body;

      // console.log( paymentId , payerId , orderId)
      
      let order = await orderModel.findById(orderId);

      if(!order){
      return res.status(400).json({ success: false, message: "order not found" });
      }

      order.paymentStatus = 'paid';
      order.orderStatus = 'confirmed';
      order.paymentId = paymentId;
      order.payerId = payerId;

      await cartModel.findByIdAndDelete(order.cartId);
      // cartItems.products = [];
      // await cartItems.save();
      await order.save();

      res.status(200).json({success : true , data : order})


   } catch (err) {
      res.status(500).json({ success: false, message: "internal error" });
   }
};


const getAllUserOrders = async(req, res)=>{
   try{
      const userId = req.user.userId;

      const orders = await orderModel.find({userId : userId}).sort({createdAt : -1})
      if(orders.length === 0){
        return res.status(400).json({success : false , message : 'no orders found'})
      }else{
        return res.status(200).json({success : true , data : orders})
      }

   }catch(err){
      res.status(500).json({success : false , message : 'internal error'})
   }
}

const getOrderDetails = async(req, res)=>{
   try{
         const {id} = req.params;

      const order = await orderModel.findById(id);
      if(!order){
        return res.status(400).json({success : false , message : ' order not found'})
      }else{
        return res.status(200).json({success : true , data : order})
      }

   }catch(err){
      res.status(500).json({success : false , message : 'internal error'})
   }
}


module.exports = { createOrder, captureOrder , getAllUserOrders , getOrderDetails};
