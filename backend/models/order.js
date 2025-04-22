const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  customerName: String,
  address: String,
  phoneNumber: String,
  orderDate: Date,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"],
    default: "Pending",
  },
  totalAmount: Number,
});

module.exports = mongoose.model("Order", OrderSchema);
