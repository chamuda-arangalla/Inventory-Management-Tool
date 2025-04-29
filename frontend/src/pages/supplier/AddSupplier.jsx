import React, { useState } from 'react';
import { createSupplier } from './SupplierApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddSupplier = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newSupplier = { supplierId, name, contact, address, email };
  
    try {
      const response = await createSupplier(newSupplier); 
      toast.success("Supplier added successfully");
      handleBack()
    } catch (error) {
      toast.error("Error adding supplier");
    }
  };

  const handleBack = () =>{
    navigate('/suppliers');
  }

  return (
<div className="container mx-auto p-6">
  <h2 className="text-2xl font-bold mb-6 text-center">ADD SUPPLIER</h2>
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Supplier ID
          </label>
          <input
            type="text"
            id="supplierId"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            placeholder="Enter Supplier ID"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Supplier Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Supplier Name"
            required
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Contact No
          </label>
          <input
            type="text"
            id="contact"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter Contact No"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow"
          >
            Add Supplier
          </button>
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md shadow"
            onClick={() => handleBack()}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  </div>
    
  );
};

export default AddSupplier;