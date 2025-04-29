const Supplier = require("../models/supplier");
const mongoose = require("mongoose");

// Create supplier
const createSupplier = async (req, res) => {
  try {
    const { supplierId, name, contact, address, email } = req.body;

    const newSupplier = new Supplier({
      supplierId,
      name,
      contact,
      address,
      email,
    });

    const savedSupplier = await newSupplier.save();

    res.status(201).json({
      message: "Supplier created successfully",
      supplier: savedSupplier,
    });
  } catch (error) {
    console.error("Error creating supplier:", error);
    res.status(500).json({ message: "Server error. Failed to create supplier." });
  }
};

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one supplier by ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update supplier
const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSupplier)
      return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete supplier
const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier)
      return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
