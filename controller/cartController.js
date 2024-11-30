const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");

const addProductToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const theProduct = await productModel.findById(productId);

    if (!theProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cartModel.findOne();
    if (!cart) {
      cart = new cartModel({
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    }

    const cartProduct = cart.products.find(
      (item) => item.toString() === productId
    );

    if (!cartProduct) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cartProduct.quantity += 1;
    }

    cart.totalQuantity += 1;
    cart.totalPrice += theProduct.price;
    await cart.save();

    return res.status(200).json({
      message: `${theProduct.name} added to cart successfully`,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured!",
      data: error.message,
    });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cart = await cartModel.findOne();

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const cartItemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartItemIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }
    const cartItem = cart.products[cartItemIndex];
    const product = await productModel.findById(cartItem.product);
    cart.totalQuantity -= cartItem.quantity;
    cart.totalPrice -= cartItem.quantity * product.price;

    cart.products.splice(cartItemIndex, 1);

    await cart.save();

    return res.status(200).json({
      message: `${product.name} removed from cart successfully`,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured!",
      data: error.message,
    });
  }
};

const viewCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne().populate("products.product");
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      message: "Cart viewed successfully!",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured!",
      data: error.message,
    });
  }
};

module.exports = { addProductToCart, removeProductFromCart, viewCart };
