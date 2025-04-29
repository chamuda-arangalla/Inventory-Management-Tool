import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getSupplierById, updateSupplier } from './SupplierApi';
import {  } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditSupplierDetails = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState({});
    const navigate = useNavigate();

  useEffect(() => {
    fetchSupplier();
  }, [id]);

  // Get all suppliers
   const fetchSupplier = async () => {
     try {
       console.log(id)
       const response = await getSupplierById(id);
       setSupplier(response.data)
     } catch (error) {
       console.error(error);
     }
   };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await updateSupplier(id, supplier); 
      toast.success('Supplier updated successfully')
      navigate(`/suppliers/${id}`);
    } catch (error) {
      toast.error('Error updating supplier')
    }
  };

  const handleBack = () =>{
    navigate('/suppliers');
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">UPDATE SUPPLIER DETAILS</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700 mb-1">
              Update Supplier ID
            </label>
            <input
              type="text"
              id="supplierId"
              name="supplierId"
              value={supplier.supplierId || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
              placeholder="Update Supplier ID"
              required
              disabled
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Update Supplier Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={supplier.name || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Supplier Name"
              required
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Update Contact No
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={supplier.contact || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Contact No"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Update Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={supplier.address || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Address"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Update Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={supplier.email || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Email Address"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow"
            >
              Update Supplier
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

export default EditSupplierDetails;
