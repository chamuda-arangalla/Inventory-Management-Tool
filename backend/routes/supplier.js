const express = require('express');
const SupplierRouter = express.Router();
const mongoose = require('mongoose');

const {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} = require('../controllers/supplier');

// Create supplier
SupplierRouter.post('/', createSupplier);

// Get all suppliers
SupplierRouter.get('/', getAllSuppliers);

// Get single supplier by ID
SupplierRouter.get('/:id', getSupplierById);

// Update supplier by ID
SupplierRouter.put('/:id', updateSupplier);

// Delete supplier by ID
SupplierRouter.delete('/:id', deleteSupplier);

module.exports = SupplierRouter;
