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
        res.status(500).json({message: "Internal server error"});
        console.log("Error adding review", err);
    }
}