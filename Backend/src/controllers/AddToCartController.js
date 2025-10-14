import Product from "../models/Product.js";
import Cart from "../models/Cart.js"
import mongoose from "mongoose";


export const AddToCart = async (req, res) => {
    const productID = req.params.productID;
    const {quantity = 1 } = req.body;
    const userId = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(400).json({message: "Invalid product ID"})
    }

    if (quantity < 1) {
        return res.status(400).json({message: "Quantity must be at least 1"});
    }

    try {
        // Find product so user can add it to cart
        const product = await Product.findById(productID).select("+price").sort({ updatedAt: -1 });
        
        // Validation: Check if the product exists
        if (!product) {
            return res.status(404).json({message: "You Can't Add this Product to a Cart Beacuse it's not Available"});
        }
    } catch () {

    }
}