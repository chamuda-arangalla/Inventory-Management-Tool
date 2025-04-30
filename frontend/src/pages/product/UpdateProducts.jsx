import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProducts = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productUnitPrice, setProductUnitPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await axios.get(`/api/products/getOneProduct/${id}`);
        const data = res.data.singleProduct;
        setProductName(data.productName);
        setProductCode(data.productCode);
        setProductUnitPrice(data.productUnitPrice);
        setProductQuantity(data.productQuantity);
      } catch (err) {
        console.log(err);
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async () => {
    try {
      await axios.patch(`/api/products/updateProduct/${id}`, {
        productName,
        productCode,
        productUnitPrice,
        productQuantity,
      });
      toast.success("Product is updated 🤩");
      navigate("/products");
    } catch (err) {
      console.log(err);
      toast.error("Error updating product");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Update Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Code:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            name="productCode"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Unit Price:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            name="productUnitPrice"
            value={productUnitPrice}
            onChange={(e) => setProductUnitPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Quantity:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            name="productQuantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Update</h2>
            <p className="mb-6">
              Are you sure you want to update this product?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setIsModalOpen(false);
                  updateProduct();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProducts;
