import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
    default: 0,
    select: false, // so i can specificaly controll the price which user can see or not
    validate: {
      validator: (value) => value >= 0,
      message: "Price must be not negative",
    },
  },
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
    default: "Add description",
    select: true,
    validate: [
      {
        validator: (value) => value.length >= 10,
        message: "The Character must be at least 10",
      },
      {
        validator: (value) => value.length <= 100,
        message: "The Character Not more than 100",
      },
    ],
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => value.length > 0,
      message: "Please Upload at least 1 images",
    },
    select: true,
    validate: {
      validator: (value) =>
        value.every(
          (url) =>
            typeof url === "string" && url.startsWith("http") && url.length > 10
        ),
      message: "Each image must be a valid URL string (min 10 characters)",
    },
    default: [], // check if the images are exist or not it help to avoid crash the server and if the images are not exist it will return error
  },
  category: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
    default: "Category",
    select: true,
    validate: {
      validator: (value) => value.length >= 6,
      message: "Category must be at least 6 characters",
    },
  },
  stock: {
    type: Number,
    required: true,
    maxlength: 50,
    default: 0,
    select: true,
    validate: {
      validator: (value) => value >= 0,
      message: "Stock must not be negative",
    },
  },
  sold: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
    default: 0,
    select: true,
    validate: {
      validator: (value) => value >= 0,
      message: "The sold must be greater than 0 not negative",
    },
  },
  ratings: {
    type: Number,
    required: true,
    maxlength: 50,
    default: 0,
    select: true,
    validate: {
      validator: (value) => value >= 0,
      message: "The ratings must not be negative",
    },
  },
  numOfreviews: {
    type: Number,
    required: true,
    maxlength: 50,
    default: 0,
    select: true,
    validate: {
      validator: (value) => value >= 0,
      message: "The number of reviews must not be negative",
    },
  },
  reviews: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
          maxlength: 100,
          default: "User",
          select: true,
        },
        comment: {
          type: String,
          required: true,
          maxlength: 100,
          default: "Comment",
          select: true,
        },
        rating: {
          type: Number,
          required: true,
          maxlength: 100,
          default: 0,
          select: true,
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;