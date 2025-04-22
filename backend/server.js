const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const { connectDB } = require("./utils/connection");

const app = express();
app.use(express.json());

//import routes
const orderRoutes = require("./routes/order.js");
const ProductRouter = require("./routes/product.js");

//routes
app.use("/api/orders", orderRoutes);
app.use("/api/products", ProductRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
