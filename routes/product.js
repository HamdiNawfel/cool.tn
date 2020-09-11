const express = require("express");

const ProductController = require("../controllers/product");
const multer = require("../middleware/multer");
const router = express.Router();

router.post("/",multer, ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);



module.exports = router;
