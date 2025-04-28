const express = require("express");
const ProductRouter = express.Router();
const upload = require('../middleware/uploadMiddleware');

const {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getAllProductNames
} = require("../controllers/product");

ProductRouter.post('/createProduct',upload.single('productImage'),createProduct);
ProductRouter.get('/getAllProducts',getAllProducts);
ProductRouter.get('/getOneProduct/:id',getOneProduct);
ProductRouter.patch('/updateProduct/:id',updateProduct);
ProductRouter.delete('/deleteProduct/:id',deleteProduct);
// get all products name
ProductRouter.get('/getAllProductNames',getAllProductNames);

module.exports = ProductRouter;