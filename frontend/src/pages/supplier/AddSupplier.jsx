import React, { useState } from "react";
import { createSupplier } from "./SupplierApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddSupplier = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplierId || !name || !contact || !address || !email) {
      toast.error("All fields are required");
      return;
    }

    const newSupplier = { supplierId, name, contact, address, email };

    try {
      const response = await createSupplier(newSupplier);
      toast.success("Supplier added successfully");
      handleBack();
    } catch (error) {
      toast.error("Error adding supplier");
    }
  };

  const handleBack = () => {
    navigate("/suppliers");
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center">ADD SUPPLIER</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="supplierId"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Supplier ID
            </label>
            <input
              type="text"
              id="supplierId"
              data-cy="input-supplierId"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              placeholder="Enter Supplier ID"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Supplier Name
            </label>
            <input
              type="text"
              id="name"
              data-cy="input-name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Supplier Name"
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Contact No
            </label>
            <input
              type="text"
              id="contact"
              data-cy="input-contact"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter Contact No"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Address
            </label>
            <input
              type="text"
              id="address"
              data-cy="input-address"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Email Address
            </label>
            <input
              type="email"
              id="email"
              data-cy="input-email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              data-cy="btn-submit"
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
            >
              Add Supplier
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

export default AddSupplier;
