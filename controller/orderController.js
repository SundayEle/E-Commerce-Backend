const orderModel = require("../model/orderModel");
const productModel = require("../model/productModel");

const placeOrder = async (req, res) => {
  try {
    const { items, paymentInfo } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items are required and must be an array." });
    }

    const productIds = items.map((item) => item.product);
    const products = await productModel.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      const missingProducts = productIds.filter(
        (id) => !products.some((product) => product._id.toString() === id)
      );
      return res.status(404).json({
        message: "Some products were not found.",
        missingProducts,
      });
    }

    let totalPrice = 0;
    const itemDetails = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.product);
      totalPrice += product.price * item.quantity;
      return {
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const order = new orderModel({
      user: req.user._id,
      items: itemDetails,
      totalPrice,
      paymentInfo,
      status: "Pending",
    });

    await order.save();

    return res.status(201).json({
      message: "Order successfully placed!",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = placeOrder;
