import express from 'express';
import { AddTocart, GetUserCart, UpdateCartItem, RemoveItemFromCart, ClearCart } from '../controlllers/AddToCartController.js';

// All cart routes required authenticat
import { authenticateToken, isUser } from '../middleware/auth.js';
import { productRateLimiter } from '../middleware/productRatelimiter.js';

const router = express.Router();

router.use(authenticateToken, isUser);
router.use(productRateLimiter);

// Apply authentication and user role middleware to all routes
router.post("/add/:productID", AddTocart);
router.get("user/cart", GetUserCart);
router.put("/cart/:productID", UpdateCartItem);
router.delete("/cart/item/:productID", RemoveItemFromCart);
router.delete("/cart/clear", ClearCart);

export default router;