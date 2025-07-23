import express from 'express';
import { addProductReview, getallProduct, getOneProduct, deleteOneProduct } from '../controllers/productController.js';
import { authenticateToken, isAdmin } from "../middleware/auth.js";
const router = express.Router();

// Routes for product
router.post("/products/:productId/reviews", authenticateToken, addProductReview);
router.get("/allproduct", authenticateToken, getallProduct);
router.get("/product/:productId", authenticateToken, getOneProduct);
router.delete("/product/:deleteProductId", authenticateToken, isAdmin, deleteOneProduct);

export default router;