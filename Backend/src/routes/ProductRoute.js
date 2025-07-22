import express from 'express';
import { addProductReview, getallProduct, getOneProduct } from '../controllers/productController.js';
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

// Routes for product
router.post("/products/:productId/reviews", authenticateToken, addProductReview);
router.get("/allproduct", authenticateToken, getallProduct);
router.get("/product/:productId", authenticateToken, getOneProduct);


export default router;