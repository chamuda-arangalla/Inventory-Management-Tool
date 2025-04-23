import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProducts = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productUnitPrice, setProductUnitPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        await axios
          .get(`/api/products/getOneProduct/${id}`)
          .then((res) => {
            setProductName(res.data.singleProduct.productName);
            setProductCode(res.data.singleProduct.productCode);
            setProductUnitPrice(res.data.singleProduct.productUnitPrice);
            setProductQuantity(res.data.singleProduct.productQuantity);
            console.log("Data Fetched 👌");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getProductById();
  }, [id]);

  const updateForm = async (e) => {
    e.preventDefault();
    console.log("Id :", id);

    try {
      if (window.confirm("Are you suer ?")) {
        await axios.patch(`/api/products/updateProduct/${id}`, {
          productName,
          productCode,
          productUnitPrice,
          productQuantity,
        });
      }
      toast.success("Product is updated 🤩");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Update Product
      </h2>
      <form onSubmit={updateForm} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="productQuantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
