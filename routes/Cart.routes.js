const express = require("express");
const {
  getCarts,
  getCart,
  addCart,
  updateProductQuantity,
  deleteCart
} = require("../controllers/Cart.controller");
const router = express.Router();

router.get("/", getCarts);
router.get("/:cartId", getCart);
router.post("/", addCart);
router.patch("/:cartId", updateProductQuantity);
router.delete("/:cartId", deleteCart);

module.exports = router;
