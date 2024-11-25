
const jwt = require('jsonwebtoken');
require('dotenv').config();

 const verifyUser = async(req , res , next)=>{
   try{

      const token = req.cookies.verify_token;
      if(!token){
         return res.status(401).json({ success:false , message : "un-authorized"});
      }
      const decode =  jwt.verify(token , process.env.JWT_SECRET);

      if(!decode){
         return res.status(401).json({ success:false , message : "un-authorized "});
      }
      req.user = decode;
      next();

   }catch(err){
      res.status(500).json({ success : false , message : 'internal error'})
   }
}

module.exports = verifyUser;