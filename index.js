const express = require("express");
const app = express();
const port = 3456;

app.use(express.json());

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
