import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSupplierById } from './SupplierApi';
import { useParams } from 'react-router-dom';

const SupplierDetails = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState({});
    const navigate = useNavigate()

  useEffect(() => {
    fetchSupplier();
  }, [id]);

   // Get all suppliers
  const fetchSupplier = async () => {
    try {
      console.log(id)
      const response = await getSupplierById(id);
      setSupplier(response.data)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleBack = () =>{
    navigate('/suppliers');
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">SUPPLIER DETAILS</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6">
          <div>
            <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier ID
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
              value={supplier.supplierId}
              placeholder="Enter Supplier ID"
              disabled
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
              value={supplier.name}
              placeholder="Enter Supplier Name"
              disabled
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Contact No
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
              value={supplier.contact}
              placeholder="Enter Contact No"
              disabled
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
              value={supplier.address}
              placeholder="Enter Address"
              disabled
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
              value={supplier.email}
              placeholder="Enter Email Address"
              disabled
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Link to={`/suppliers/update/${supplier._id}`}>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow"
              >
                Edit
              </button>
            </Link>
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
}

export default SupplierDetails;