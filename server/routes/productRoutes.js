const route = require("express").Router();
const verifyUser = require("../middlewares/verifyUser");
const { multipleUpload } = require("../middlewares/cloudinary");

const {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  adminUpdateUser,
  adminAllOrdersUsers,
} = require("../controllers/productCont");

route.post("/add", multipleUpload, verifyUser, addProduct);

route.put("/edit/:id", multipleUpload, verifyUser, editProduct);

route.delete("/delete/:id", verifyUser, deleteProduct);

route.put("/updatestatus/:id", verifyUser, adminUpdateUser);

route.get("/allusersorders", verifyUser, adminAllOrdersUsers);


route.get("/getproducts", getAllProducts);


module.exports = route;
