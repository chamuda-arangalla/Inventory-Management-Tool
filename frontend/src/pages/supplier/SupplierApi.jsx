import axios from 'axios';

const API_BASE_URL = 'http://localhost:6500/api/suppliers';

// Get all suppliers
export const getSuppliers = () => {
  return axios.get(API_BASE_URL);
};

// Get a supplier by ID
export const getSupplierById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

// Create a new supplier
export const createSupplier = (supplierData) => {
  return axios.post(`${API_BASE_URL}`, supplierData);
};

// Update a supplier
export const updateSupplier = (id, supplierData) => {
  return axios.put(`${API_BASE_URL}/${id}`, supplierData);
};

// Delete a supplier
export const deleteSupplier = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
