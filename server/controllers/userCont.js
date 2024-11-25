const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { cloudinary } = require("../middlewares/cloudinary");

const userModel = require("../models/userModel");

// controllers

const signUpUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "all fileds are required" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "user eamil already registered" });
    }

    const hashPswd = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      fullName,
      email,
      password: hashPswd,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "account created success",
    });
  } catch (err) {
    res.status(500).json({ message: "internal error" });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "all fields required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "email not found ! try again" });
    }

    const checkPswd = await bcrypt.compare(password, user.password);

    if (!checkPswd) {
      return res
        .status(500)
        .json({ success: false, message: "incorrect password ! try again" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("verify_token", token, {
      httpOnly: true,
      secure : process.env.PRODUCTION === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // passowrd  and role was hiding from client view
    user.password = undefined;
    
    return res.status(200).json({ success: true , message: "login success" , data : user
    });
    
  } catch (err) {
    res.status(500).json({ message: "internal error" });
  }
};

const SignOutUser = async (req, res) => {
  try {
    res.clearCookie("verify_token", "", { maxAge: 0 });

    res.status(201).json({ success : true ,  message: "logout success" });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const updateUser = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { fullName, email, password } = req.body;

    const userInfo = await userModel.findById(userId);
    if (!userInfo) {
      res.status(400).json({ success: false, message: "user not verified" });
    }

    let profilePicture = userInfo.profile;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });

      profilePicture = result.secure_url;
    }

    let hashedPassword = userInfo.password;

    if (password) {
      // if password is there body
      hashedPassword = bcrypt.hashSync(password, 10);
    }

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      {
        fullName: fullName || userInfo.fullName,
        email: email || userInfo.email,
        password: hashedPassword,
        profile: profilePicture,
      },
      { new: true }
    );

    updateUser.password = undefined;

    res.status(200).json({ success: true, updateUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const userDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId);
    // console.log(user)
    return res.status(200).json(`{ welcome to store ${user?.fullName} }`);
  } catch (err) {
    res.status(500).json({ success: false, message: "internal errorss" });
  }
};


module.exports = {
  signUpUser,
  signInUser,
  SignOutUser,
  updateUser,
  userDashboard,
 
};
