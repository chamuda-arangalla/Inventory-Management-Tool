const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./utils/connection");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//import routes
const orderRoutes = require("./routes/order.js");
const ProductRouter = require("./routes/product.js");
const UserRouter = require("./routes/user.js")

//routes
app.use("/api/orders", orderRoutes);
app.use("/api/products", ProductRouter);
app.use("/api/users", UserRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
