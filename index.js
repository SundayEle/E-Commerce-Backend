const express = require("express");
const app = express();
const environment = require("./env/environmentVar");
const databaseConnect = require("./config/databaseConnect");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
databaseConnect();

app.use("/api/v1/user", userRoutes);
app.listen(environment.PORT, () => {
  console.log(`App running on ${environment.PORT}`);
});
