import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteSupplier, getSuppliers } from './SupplierApi';
import { EyeIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { toast } from 'react-toastify';

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  useEffect(() => {
    fetchSuppliers();
    console.log(suppliers)
  }, []);

  const handleView = (id) =>{
    console.log(id)
  }

  // Get all suppliers
const fetchSuppliers = async () => {
  try {
    const response = await getSuppliers();
    setSuppliers(response.data)
  } catch (error) {
    console.error(error);
    toast.error("Error Fetching Supplier Data")
  }
};

const handleDelete = async (id) => {
  try {
    const response = await deleteSupplier(id);
    
    if (response.status === 200) {
      toast.success('Supplier deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
      fetchSuppliers()
      setIsModalOpen(false);
    }
  } catch (error) {   
    toast.error('Failed to delete supplier.', {
      position: "top-right",
      autoClose: 3000,
    });
  }
};

const handleSearchChange = (e) => {
  setSearch(e.target.value);
};

const filteredSuppliers = suppliers.filter((supplier) =>
  supplier.name.toLowerCase().includes(search.toLowerCase()) ||
  supplier.supplierId.toLowerCase().includes(search.toLowerCase()) ||
  supplier.contact.toLowerCase().includes(search.toLowerCase()) ||
  supplier.address.toLowerCase().includes(search.toLowerCase()) ||
  supplier.email.toLowerCase().includes(search.toLowerCase())
);

const handleDeleteClick = (supplierId) => {
  setIsModalOpen(true);           
  setSelectedSupplierId(supplierId);
};


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Supplier Management</h1>
        <Link to="/suppliers/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add Supplier
          </button>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          placeholder="Search by name, contact, address, or email"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Suppliers List</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-700">Supplier ID</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Contact</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Address</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.supplierId} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{supplier.supplierId}</td>
                  <td className="px-4 py-2">{supplier.name}</td>
                  <td className="px-4 py-2">{supplier.contact}</td>
                  <td className="px-4 py-2">{supplier.address}</td>
                  <td className="px-4 py-2">{supplier.email}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <Link to={`/suppliers/update/${supplier._id}`}>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        // onClick={() => handleView(supplier._id)}
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(supplier._id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-gray-500">
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this supplier?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(selectedSupplierId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default ViewSuppliers;