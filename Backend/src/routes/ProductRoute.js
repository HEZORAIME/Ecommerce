import express from 'express';
import { addProductReview, getallProduct, getOneProduct, deleteOneProduct, updateProduct, createProduct } from '../controllers/productController.js';
import { authenticateToken, isAdmin, isUser } from "../middleware/auth.js";
import { productRateLimiter } from "../middleware/productRatelimiter.js";
import { upload } from '../middleware/cloudinary.js';

const router = express.Router();

router.post("/product", authenticateToken, isAdmin, (req, res, next) => {
    upload.array('images', 5)(req, res, (err) => {
        if (err) {
            console.error("Upload middleware error", err);
            return res.status(400).json({ message: "Image upload failed", error: err.message || String(err) });
        }
        next();
    });
}, createProduct);

// Routes for product - apply rate limiting only for users
router.post("/products/:productId/reviews", authenticateToken, isUser, productRateLimiter, addProductReview);
router.get("/allproduct", productRateLimiter, authenticateToken, isUser, getallProduct); // user can access all products with rate limiter
router.get("/allproduct/Admin", authenticateToken, isAdmin, getallProduct); // admin can access all products without affected by rate limiter
router.get("/product/:productId", authenticateToken, isUser, productRateLimiter, getOneProduct);
// Admin-only routes - no rate limiting
router.delete("/product/:deleteProductId", authenticateToken, isAdmin, deleteOneProduct);
router.put("/product/:productId", authenticateToken, isAdmin, updateProduct);
export default router;