import Product from "../models/Product.js";
import mongoose from "mongoose";


export const AddToCart = async (req, res) => {
    const productID = req.params.productID;

    if(mongoose.Types.ObjectId.isValid(productID))
}