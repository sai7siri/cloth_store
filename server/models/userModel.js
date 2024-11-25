const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

   fullName : {
      type : String,
      required : true
   },
   email : {
      type : String,
      required : true,
      unique : true
   },
   password : {
      type : String,
      required : true
   },
   role : {
      type : String,
      enum : ['customer' , 'adimn'],
      default : 'customer'
   },

   profile : {
         type : String,
         default : 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' 
   },
},

{
   timestamps : true
}

)

const userModel = mongoose.model('User' , userSchema);

module.exports = userModel;
