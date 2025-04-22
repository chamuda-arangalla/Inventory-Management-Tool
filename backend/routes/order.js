const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

// Create new order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get single order
router.get("/:id", getOrderById);

// Update order
router.put("/:id", updateOrder);

// Delete order
router.delete("/:id", deleteOrder);

module.exports = router;
