const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products:[
   {
         productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
         },
         size : String,
         quantity : {
            type : String,
            default : 1
         }
   }
]
},
{
   timestamps : true
}
);

module.exports = mongoose.model('Cart' , cartSchema);
