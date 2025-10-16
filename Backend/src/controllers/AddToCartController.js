import Product from "../models/Product.js";
import Cart from "../models/Cart.js"
import mongoose from "mongoose";


export const AddToCart = async (req, res) => {
    const productID = req.params.productID;
    const { quantity = 1 } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(400).json({ message: "Invalid product ID" })
    }

    if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    try {
        // Find product so user can add it to cart
        const product = await Product.findById(productID).select("+price").sort({ updatedAt: -1 });

        // Validation: Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "You Can't Add this Product to a Cart Beacuse it's not Available" });
        }

        // check if the product stock is less than the quantity user want to add to cart
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock available", availableStock: product.stock });
        }

        // find the cart for the user or create a new cart if the user not have a cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // create a new cart for the user and add product to the cart
            cart = new Cart({
                user: userId, items: [],
            });
        }

        // Check if the product are already in the cart
        const exisItemIndex = cart.items.findIndex((items) => items.product.toString() === productID
    );


    if (exisItemIndex > - 1) {
        // already in the cart we can update the quantity and price
        const newQuantity = cart.items[exisItemIndex].quantity + quantity;
    }


    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}