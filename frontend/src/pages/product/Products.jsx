import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/products/getAllProducts");
        setAllProducts(res.data.allproducts);
        setFilteredProducts(res.data.allproducts);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  // 🔍 Dynamic Filtering as You Type
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = allProducts.filter((product) =>
      [product.productName, product.productCode, product.productUnitPrice?.toString(), product.productQuantity?.toString()]
        .some(field => field?.toLowerCase().includes(term))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, allProducts]);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/deleteProduct/${id}`);
        alert("Product Deleted Successfully");
        window.location.href = "/products";
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <Link to="/products/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add Product
          </button>
        </Link>
      </div>

      {/* 🔎 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, code, price, or quantity..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Products List</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Product Code</th>
              <th className="px-6 py-3 text-left">Unit Price</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={`/uploads/${product.productImage}`}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/64?text=No+Image";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900">{product.productName}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productCode}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productUnitPrice}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productQuantity}</td>
                  <td className="px-6 py-4 flex gap-3">
                    {/* ✏️ Edit Button */}
                    <Link to={`/products/update/${product._id}`}>
                        <button
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit Product"
                        >
                        <PencilIcon className="w-5 h-5" />
                        </button>
                    </Link>

                    {/* 🗑 Delete Button */}
                        <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-500 hover:text-red-600"
                            title="Delete Product"
                        >
                        <TrashIcon className="w-5 h-5" />
                        </button>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
