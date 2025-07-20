import Product from "../models/Product.js";

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
        res.status(500).json({ message: "Internal server error" });
        console.error("Error creating product", err);
    }
}