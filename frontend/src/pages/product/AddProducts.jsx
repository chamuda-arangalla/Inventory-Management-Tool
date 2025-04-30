import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productUnitPrice, setProductUnitPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!productName) {
      formIsValid = false;
      errors["productName"] = "Please enter product name";
    }

    if (!productCode) {
      formIsValid = false;
      errors["productCode"] = "Please enter product code";
    }

    if (!productUnitPrice) {
      formIsValid = false;
      errors["productUnitPrice"] = "Please enter unit price";
    }

    if (!productQuantity) {
      formIsValid = false;
      errors["productQuantity"] = "Please enter quantity";
    }

    if (!productImage) {
      formIsValid = false;
      errors["productImage"] = "Please select a product image";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const resetForm = () => {
    setProductName("");
    setProductCode("");
    setProductUnitPrice("");
    setProductQuantity("");
    setProductImage("");
    setFormErrors({});
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productCode", productCode);
      formData.append("productUnitPrice", productUnitPrice);
      formData.append("productQuantity", productQuantity);
      formData.append("productImage", productImage);

      await axios.post("/api/products/createProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully 👌");
      navigate('/products');
      resetForm(); 
      
      

    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Product code already exists ❌");
      } else {
        console.error("Error occurred:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-md mt-15">
      
      <h2 className="mb-6 text-xl font-bold text-gray-800">Add New Product</h2>
      <form
        onSubmit={addProduct}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.productName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product name"
          />
          {formErrors.productName && (
            <p className="mt-1 text-sm text-red-500">{formErrors.productName}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Code
          </label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.productCode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product code"
          />
          {formErrors.productCode && (
            <p className="mt-1 text-sm text-red-500">{formErrors.productCode}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Unit Price
          </label>
          <input
            type="text"
            value={productUnitPrice}
            onChange={(e) => setProductUnitPrice(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.productUnitPrice ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter unit price"
          />
          {formErrors.productUnitPrice && (
            <p className="mt-1 text-sm text-red-500">{formErrors.productUnitPrice}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="text"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.productQuantity ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter quantity"
          />
          {formErrors.productQuantity && (
            <p className="mt-1 text-sm text-red-500">{formErrors.productQuantity}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.productImage ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.productImage && (
            <p className="mt-1 text-sm text-red-500">{formErrors.productImage}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          {/* Back button on the left */}
          <button
            type="button"
            className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-md shadow hover:bg-gray-700"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          {/* Reset and Submit buttons on the right */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create Product
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AddProducts;
