const express = require("express");
const app = express();
const environment = require("./env/environmentVar");
const databaseConnect = require("./config/databaseConnect");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const refundRoutes = require("./routes/refundRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use(express.json());
databaseConnect();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/Category", productCategoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/refund", refundRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.listen(environment.PORT, () => {
  console.log(`App running on port ${environment.PORT}`);
});
