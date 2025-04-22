const mongoose = require ("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type:String,
        trim:true,
        required:true
    },
    productCode: {
        type: String,
        trim:true,
        required:true
    },
    productUnitPrice: {
        type:String,
        trim:true,
        required:true
    },
    productQuantity:{
        type:String,
        trim:true,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
},
    {
        timestamps:true
    }
);

const product = mongoose.model('products', productSchema);
module.exports = product;