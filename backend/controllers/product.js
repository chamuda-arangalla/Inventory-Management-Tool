const Product = require("../models/product");
const upload = require("../middleware/uploadMiddleware");

// Create product
const createProduct = async (req, res) => {
  try {
    const { productName, productCode, productUnitPrice, productQuantity } =
      req.body;

    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ productName: productName });

    // If product already exists, return error
    if (existingProduct) {
      return res.status(400).send({
        status: false,
        message: "Product with the same name already exists",
      });
    }

    // Retrieve the file path from req.file
    const productImage = req.file.originalname;

    const newProduct = new Product({
      productName: productName,
      productCode: productCode,
      productUnitPrice: productUnitPrice,
      productQuantity: productQuantity,
      productImage: productImage,
    });

    await newProduct.save();

    return res.status(200).send({
      status: true,
      message: "Product created successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//getAll products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send({
      status: true,
      message: "product received successfully",
      allproducts: products,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//getOneProduct
const getOneProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    return res.status(200).send({
      status: true,
      message: "product received successfully",
      singleProduct: product,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//updateProduct
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { productName, productCode, productUnitPrice, productQuantity } =
      req.body;

    const updateProduct = {
      productName: productName,
      productCode: productCode,
      productUnitPrice: productUnitPrice,
      productQuantity: productQuantity,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateProduct
    );

    return res.status(200).send({
      status: true,
      message: "Product updated successfully",
      allproducts: updatedProduct,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//deleteProduct
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await Product.findByIdAndDelete(productId);

    return res.status(200).send({
      status: true,
      message: "Product Deleted Successfully",
      deleteproduct: deleteProduct,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//getAll product names
const getAllProductNames = async (req, res) => {
  try {
    const products = await Product.find().select("productName productUnitPrice");
    return res.status(200).send({
      allproducts: products,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getAllProductNames,
};
