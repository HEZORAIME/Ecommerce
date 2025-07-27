import Product from "../models/Product.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    const { name, price, description, images,
        category, stock, sold, ratings, numOfreviews, reviews } = req.body;
    if (!name || !price || !description || !images || !category || !stock) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const product = new Product({
            name, price, description, images, category, stock,
            sold, ratings, numOfreviews, reviews
        });
        await product.save();
        res.status(201).json({ message: "Product created successfully" });


    } catch (err) {
        console.error("Error creating product", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getallProduct = async (req, res) => {
    const {category} = req.query;
    let query = {};
    if(category) {
        query.category = category;
    }
    try {
        const product = await Product.find(query).sort({createdAt: -1});
        res.status(200).json({message: "Product featched successfully", product});
    } catch (err) {
        console.error("Error fetching all the product", err);
        res.status(500).json({message: "Internal server error"});
    }
}
export const getOneProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({message: "Product not found"})
        } else {
            res.status(200).json({message: "Product featched successfully", product});
        }
    } catch (err) {
        console.error("Error fetching product", err);
        res.status(500).json({message: "Internal server error call 911"});
    }
};
export const deleteOneProduct = async (req, res) => {
    const deleteProductId = req.params.deleteProductId;

    if (!mongoose.Types.ObjectId.isValid(deleteProductId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndDelete(deleteProductId);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const updateFields = {};
    const {name, price, description, images, category, stock} = req.body;

    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            updateFields[key] = req.body[key];
        }
    }

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    updateFields.updatedAt = Date.now();
    try{
        const product = await Product.findByIdAndUpdate(productId, updateFields, {
            name, price, description, images, category, stock
        }, {new: true});
        if (product) {
            res.status(200).json({message: "Product updated successfully", product});
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch(err) {
        console.error("Error Updating product", err)
        res.status(500).json({message: "Internal server error"});
    }
};
export const updateProductReview = async (req,res) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const {user, name, comment, rating} = req.body;
    try {
        const product = await Product.findOneAndUpdate({
            _id: productId,
            "reviews._id": reviewId
        }, {
            $set: {
                "reviews.$.user": user,
                "reviews.$.name": name,
                "reviews.$.comment": comment,
                "reviews.$.rating": rating
            }
        }, {new: true});
        if (!product) {
            return res.status(404).json({message: "Review not found", reviewId});
        }
        return res.status(200).json({message: "Review updated successfully", product});
    } catch (err) {
        console.error("Error updating review", err);
        res.status(500).json({message: "internal server error"});
    }
}

export const addProductReview = async(req, res) => {
    const productId = req.params.productId;
    const {user, name, comment, rating} = req.body;
    if(!user|| !name|| !comment || !rating == null) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const newReview = {user, name, comment, rating};
        product.reviews.push(newReview);
        product.numOfreviews = product.reviews.length;
        product.ratings = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.numOfreviews;

        await product.save();
        res.status(201).json({message: "Review added successfully", product});
    } catch(err) {
        console.log("Error adding review", err);
        res.status(500).json({message: "Internal server error"});
    }
};