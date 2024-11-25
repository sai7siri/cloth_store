const userModel = require("../models/userModel");
const addressModel = require("../models/addresModel");

const addAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, city, street, state, postalCode, phone } = req.body.form;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "un-authorized ? user not found" });
    }

    const userAddress = new addressModel({
      userId,
      name,
      city,
      street,
      state,
      postalCode,
      phone,
    });

    await userAddress.save();
    res.status(200).json({ success: true, data: userAddress });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const getAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "un-authorized ? user not found" });
    }

    const address = await addressModel.find({ userId });

    if (address.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.body;
    const userId = req.user.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "un-authorized ? user not found" });
    }

    const removeAddress = await addressModel.findOneAndDelete({
      _id: addressId,
    });

    if (!removeAddress) {
      return res
        .status(400)
        .json({ success: false, message: " user address not found" });
    }

    res.status(200).json({ success: true, data: removeAddress });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const editAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {id} = req.params;
    const { name, city, street, state, postalCode, phone } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "un-authorized ? user not found" });
    }

    const userAddress = await addressModel.findByIdAndUpdate(
       id,  
      {
      name : name,
      city : city, 
      street : street, 
      state : state, 
      postalCode : postalCode, 
      phone : phone,
    },
   {
      new : true
   }
   );
    res.status(200).json({ success: true, data: userAddress });
    
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

module.exports = { addAddress, getAddress, deleteAddress, editAddress };
