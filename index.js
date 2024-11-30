const express = require("express");
const app = express();
const environment = require("./env/environmentVar");
const databaseConnect = require("./config/databaseConnect");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(express.json());
databaseConnect();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/Category", productCategoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/review", reviewRoutes);
app.listen(environment.PORT, () => {
  console.log(`App running on port ${environment.PORT}`);
});
