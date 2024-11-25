const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");

const { cloudinary } = require("../middlewares/cloudinary");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      bestSeller,
      sizes,
    } = req.body;
    const files = req.files["images"];

    const userId = req.user.userId;

    const adminAcc = await userModel.findById(userId);

    if (adminAcc.role !== "admin") {
      return res
        .status(401)
        .json({
          success: false,
          message: "you are not a admin ! only admin can handle",
        });
    }

    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !subCategory ||
      !bestSeller ||
      !sizes
    ) {
      return res
        .status(401)
        .json({ success: false, message: "all fields are required" });
    }

    let newProducts = [];
    const sizeArray = sizes
      .toUpperCase()
      .split(",")
      .map((size) => size.trim());

    if (files && files.length > 0) {
      for (const image of files) {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: "products",
        });
        newProducts.push(result.secure_url);
      }
    }

    const addItem = new productModel({
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: sizeArray,
      products: newProducts,
    });

    await addItem.save();
    res.status(200).json({ success: true, message: "product added success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, data: "internal error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      bestSeller,
      sizes,
    } = req.body;
    const { id } = req.params;
    const files = req.files["images"];

    const userId = req.user.userId;

    const adminAcc = await userModel.findById(userId);

    if (adminAcc.role !== "admin") {
      return res
        .status(401)
        .json({
          success: false,
          message: "you are not a admin ! only admin can handle",
        });
    }

    // Check if the product exists

    const existingProduct = await productModel.findById(id);

    if (!existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    // Handle sizes input
    let sizeArray;
    if (sizes) {
      sizeArray = sizes
        .toUpperCase()
        .split(",")
        .map((size) => size.trim());
    }

    // Prepare images
    let latestImages = existingProduct.products || [];

    if (files && files.length > 0) {
      for (const image of files) {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: "products",
        });
        latestImages.push(result.secure_url);
      }
    }

    // Prepare the update object
    const updatingProduct = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(stock && { stock }),
      ...(category && { category }),
      ...(subCategory && { subCategory }),
      ...(sizes && { sizes: sizeArray }),
      bestSeller: bestSeller === "true" ? true : false,
      products: latestImages,
    };

    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatingProduct,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(400).json({ success: false, message: "Update failed" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Update successful",
        data: updatedProduct,
      });
  } catch (err) {
    console.error(err); // Use console.error for errors
    return res.status(500).json({ success: false, message: "Internal error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.userId;

    const adminAcc = await userModel.findById(userId);

    if (adminAcc.role !== "admin") {
      return res
        .status(401)
        .json({
          success: false,
          message: "you are not a admin ! only admin can handle",
        });
    }

    const removeItem = await productModel.findByIdAndDelete(id);

    if (!removeItem) {
      return res
        .status(401)
        .json({ success: false, message: "product not found" });
    }

    return res
      .status(201)
      .json({ success: true, message: "product was deleted!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "internal error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(401).json({ success: false, message: "product not found" });
  }
};

const getSinglelProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const singleItem = await productModel.findById(id);

    if (!singleItem) {
      return res
        .status(401)
        .json({ success: false, message: "product not found" });
    }

    return res.status(201).json({ success: true, data: singleItem });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

// gett all orders from users and update status

const adminAllOrdersUsers = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "only admin can handle" });
    }

    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "orders not found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const adminUpdateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {id} = req.params;
    const { newStatus } = req.body;


    const user = await userModel.findById(userId);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "only admin can handle" });
    }

    const order = await orderModel.findByIdAndUpdate(id , {
      orderStatus : newStatus
    })

    if(!order){
      return res
      .status(400)
      .json({ success: false, message: "order not found" });
    }

     res
    .status(200)
    .json({ success: true, message: "order status updated" , data : order });

  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  editProduct,
  adminUpdateUser,
  getAllProducts,
  getSinglelProduct,
  adminUpdateUser,
  adminAllOrdersUsers
};
