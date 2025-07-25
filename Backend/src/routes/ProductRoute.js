import express from 'express';
import { addProductReview, getallProduct, getOneProduct, deleteOneProduct, updateProduct } from '../controllers/productController.js';
import { authenticateToken, isAdmin } from "../middleware/auth.js";
import { productRateLimiter } from "../middleware/productRatelimiter.js";
const router = express.Router();

// Routes for product - authentication first, then rate limiting (skipped for admins)
router.post("/products/:productId/reviews", authenticateToken, productRateLimiter, addProductReview);
router.get("/allproduct", authenticateToken, productRateLimiter, getallProduct);
router.get("/product/:productId", authenticateToken, productRateLimiter, getOneProduct);
// Admin-only routes - no rate limiting needed since admins are skipped anyway
router.delete("/product/:deleteProductId", authenticateToken, isAdmin, deleteOneProduct);
router.put("/product/:productId", authenticateToken, isAdmin, updateProduct);
export default router;