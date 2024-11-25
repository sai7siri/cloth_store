const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;
    const { size } = req.body;

    let cartDetails = await cartModel.findOne({ user: userId });

    if (!cartDetails) {
      cartDetails = new cartModel({ user: userId, products: [] });
    }

    const existedProduct = cartDetails.products.find(
      (item) => item.productId.equals(productId) && item.size === size
    );

    if (existedProduct) {
      res.status(401).json({
        success: false,
        message: "product already in cart..",
      });
    } else {
      cartDetails.products.push({
        productId: productId,
        size: size,
        quantity: 1,
      });
      await cartDetails.save();

      res.status(200).json({ success: true, message: "product added to cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;
    const { size } = req.body;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res
        .status(401)
        .json({ success: false, message: "cart not found" });
    }

    // console.log(cart);

    const productIndex = cart.products.findIndex(
      (item) => item.productId.equals(productId) && item.size === size
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Save the updated user details
    await cart.save();

    res.status(200).json({
      success: true,
      message: "product removed from cart",
      cart: cart,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, size, quantity } = req.body;


    if (!productId || !size || !quantity) {
      return res
        .status(401)
        .json({ success: false, message: "something occured" });
    }

    const cart = await cartModel.findOne({ user: userId });
    
    if (!cart) {
      return res
        .status(401)
        .json({ success: false, message: "cart not found" });
    }

    const userQuant = cart?.products.find(
      (item) => item.productId.equals(productId) && item?.size == size
    );

    if (!userQuant) {
      return res
        .status(401)
        .json({ success: false, message: "product not found" });
    }
    userQuant.quantity = quantity;
    await cart.save();
    return res.status(201).json({ success: true, message: "quantity updated" , data : cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const cartEmpty = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cartId } = req.body;

    const userInfo = await cartModel.findOne({user : userId});

    if (!userInfo) {
      return res
        .status(401)
        .json({ success: false, message: "cart not found" });
    }
    
    userInfo.products = [];
    userInfo.save();
    res.status(200).json({ success: true, message: "cart is clear" });

  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "internal error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await cartModel.findOne({ user: userId }).populate({
      path: "products.productId",
      select: "name price products", // Select fields to return from Product model
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });
    }

    const cartDetails = cart.products.map((item) => ({
      productId: item.productId._id,
      image: item.productId.products,
      price: item.productId.price,
      name: item.productId.name,
      size: item.size,
      quantity: item.quantity,
    }));

    const response = {
      cartId: cart._id,
      userId: cart.user,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      cartData: cartDetails,
    };

    res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal error" });
  }
};

module.exports = {
  addToCart,
  deleteFromCart,
  cartEmpty,
  getCart,
  updateCart,
};
