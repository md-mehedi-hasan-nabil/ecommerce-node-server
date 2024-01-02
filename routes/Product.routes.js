const express = require("express");
const {
    getProducts, getProduct, addProduct, updateProduct, deleteProduct
} = require("../controllers/Product.controller");
const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProduct);
router.post("/", addProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
