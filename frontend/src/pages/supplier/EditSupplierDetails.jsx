import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSupplierById, updateSupplier } from "./SupplierApi";
import { toast } from "react-toastify";

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
      console.log(id);
      const response = await getSupplierById(id);
      setSupplier(response.data);
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
      toast.success("Supplier updated successfully");
      navigate(`/suppliers/${id}`);
    } catch (error) {
      toast.error("Error updating supplier");
    }
  };

  const handleBack = () => {
    navigate("/suppliers");
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center">
        UPDATE SUPPLIER DETAILS
      </h2>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="supplierId"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Update Supplier ID
            </label>
            <input
              type="text"
              id="supplierId"
              data-cy="input-supplierId"
              name="supplierId"
              value={supplier.supplierId || ""}
              onChange={handleChange}
              className="w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
              placeholder="Update Supplier ID"
              required
              // disabled
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Update Supplier Name
            </label>
            <input
              type="text"
              id="name"
              data-cy="input-name"
              name="name"
              value={supplier.name || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Supplier Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Update Contact No
            </label>
            <input
              type="text"
              id="contact"
              data-cy="input-contact"
              name="contact"
              value={supplier.contact || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Contact No"
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Update Address
            </label>
            <input
              type="text"
              id="address"
              data-cy="input-address"
              name="address"
              value={supplier.address || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Update Email Address
            </label>
            <input
              type="text"
              id="email"
              data-cy="input-email"
              name="email"
              value={supplier.email || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Update Email Address"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              data-cy="btn-update"
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
            >
              Update Supplier
            </button>
            <button
              type="button"
              data-cy="btn-back"
              className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-md shadow hover:bg-gray-700"
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
