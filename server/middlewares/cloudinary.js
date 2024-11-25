const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
   require('dotenv').config();


   // cloudinary confiuration
   cloudinary.config({
      cloud_name : process.env.CLOUD_NAME,
      api_key : process.env.API_KEY,
      api_secret : process.env.API_SECRET
   })



// Set up multer disk storage
const storage = multer.diskStorage({

  filename: function (req, file, cb) {
    //Create a unique filename with timestamp and original extension
    
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix); // e.g., 1618295014748.png
  },
});


// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only image files are allowed!'), false); // Reject the file
  }
};

// Create a multer instance for single file uploads
const singleUpload = multer({
  storage,
  fileFilter,
}).single('profile'); // Adjust 'file' to the name of the input field in your form

// Create a multer instance for multiple file uploads
const multipleUpload = multer({
  storage,
  fileFilter,
}).fields([{name : 'images' , maxCount : 10 }])// Adjust 'files' and the limit as needed

module.exports = { singleUpload , multipleUpload , cloudinary };
