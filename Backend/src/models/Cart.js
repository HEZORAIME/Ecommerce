import mongoose from "mongoose";

const AddToCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 50,
        default: 1,
        validate: {
            validator: (value) => value > 0,
            message: "Quantrity must be greater than 0",
        },
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 10000000000,
        default: 0,
        select: false, // control the price which user can see or not
        validate: { // adding validate to price to make sure that the price is not negative
            validator: (value) => value >=0,
            message: "Price must not be negative"
        }
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});
const AddToCart = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [AddToCartSchema],
    totalItems: {
        type: Number,
        default: 0,
        min: 0
    },
    totalPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

AddToCartSchema.methods.calculateTotals = function () {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.updatedAt = Date.now();
};

const Cart = mongoose.model("Cart", AddToCart);
export default Cart;