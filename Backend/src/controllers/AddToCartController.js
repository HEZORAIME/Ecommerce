import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";

export const AddToCart = async (req, res) => {
  const productID = req.params.productID;
  const { quantity = 1 } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    // Find product so user can add it to cart
    const product = await Product.findById(productID)
      .select("+price")
      .sort({ updatedAt: -1 });

    // Validation: Check if the product exists
    if (!product) {
      return res.status(404).json({
        message:
          "You Can't Add this Product to a Cart Beacuse it's not Available",
      });
    }

    // check if the product stock is less than the quantity user want to add to cart
    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Not enough stock available",
        availableStock: product.stock,
      });
    }

    // find the cart for the user or create a new cart if the user not have a cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // create a new cart for the user and add product to the cart
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // Check if the product are already in the cart
    const exisItemIndex = cart.items.findIndex(
      (items) => items.product.toString() === productID
    );

    if (exisItemIndex > -1) {
      // already in the cart we can update the quantity and price
      const newQuantity = cart.items[exisItemIndex].quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({
          message: "Not enough stock available",
          availableStock: product.stock,
          currentIncart: cart.items[exisItemIndex].quantity,
        });
      }
      cart.items[exisItemIndex].quantity = newQuantity;
    } else {
      // Add product to the cart
      cart.items.push({
        product: productID,
        quantity: quantity,
        price: product.price,
      });
    }
    // Calculate totals
    cart.calculateTotals();

    // Save cart
    await cart.save();

    // Using populate method by Mongoose used in node.js, So frontend(users) can see important details
    // of the product not just the productID
    await cart.populate("items.product", "name images category stock price");

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (err) {
    console.error("Can't add product to cart:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Function for Getting a User Cart
 */
export const GetUserCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price images category stock"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        message: "The cart was empty",
        cart: { items: [], totalItems: 0, totalPrice: 0 },
      });
    }
    return res.status(200).json({ message: "Cart get successfully", cart });
  } catch (err) {
    console.error("Can't get user cart:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Function for Updating the quantity of a product in the cart
 */

export const UpdateCartItem = async (req, res) => {
  const productID = req.params.productID;
  const { quantity } = req.body;
  const userId = req.user._id;

  // Validation for productID
  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  // validation for making sure the quantity are not negative and not zero
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productID
    );
    // check if the product are exist in the cart if not return status 404
    // -1 is used to check if the product are not found in the cart
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Check product stock
    const product = await Product.findById(productID)
      .select("+price")
      .sort({ updatedAt: -1 });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
        availableStock: product.stock,
      });
    }
    // adding this line to update the total price of the product in the cart
    // by multiplying the quantity with the price of the product
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price = product.price * quantity;

    cart.calculateTotals();

    await cart.save();

    await cart.populate("items.product", "name images category");

    return (
      res.status(200),
      json({
        message: "Cart updated successfully",
        cart,
      })
    );
  } catch (err) {
    console.error("Can't update cart item:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * clear item from the cart
 */

export const RemoveItemthecart = async (req, res) => {
  const productID = req.params.productID;
  const userId = req.user._id;

  if(!mongoose.Types.ObjectId.isValid(productID)) {
    return res.status(400),jsonb({ message: "Incalid product ID" });
  }

  try{
    const cart = await Cart.findOne({ user: userId });

    if(!cart) {
      return res.status(404).json({message: "Cart not Found enable to remove the item"});
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productID
    );
    
    if(itemIndex === -1) {
      return res.status(404).json({message: "Product not found in cart"});
    }
    // using splice method by js i can remove specific item from the array
    cart.items.splice(itemIndex, 1);

    // Calculate totals
    cart.calculateTotals();

    await cart.save();

    // using populate method in mongoose use in node.js to show the contain of the product in the front end not just the productID
    await cart.populate("items.product", "name images category");

    return res.status(200).json({message: "product removed successfully", cart});
  } catch (err) {
    console.error("Can't remove the product from the cart", err);
    return res.status(500).json({ message: "Internal Error"});
  }
};

/**
 * clear the all cart
 */
export const removecart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({message: "Cart not found"});
    }

    cart.items = [];
    cart.totalItems = 0;
    cart

  } catch(err) {

  }
}