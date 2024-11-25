const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cartId: String,
    cartData: [
      {
        productId: String,
        title: String,
        image: String,
        price: String,
        size: String,
        quantity: Number,
      },
    ],

    address: {
      name: String,
      city: String,
      state: String,
      street: String,
      postalCode: String,
      phone: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: String,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
