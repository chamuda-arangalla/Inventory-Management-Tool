import React, { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "sonner";

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6500/api/products/getAllProductNames"
        );
        setProducts(res.data.allproducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle selecting/deselecting a product
  const handleProductChange = (productId) => {
    const existingProduct = selectedProducts.find(
      (p) => p.productId === productId
    );

    if (existingProduct) {
      // Remove it
      setSelectedProducts(
        selectedProducts.filter((p) => p.productId !== productId)
      );
    } else {
      // Add new with quantity 1
      setSelectedProducts([...selectedProducts, { productId, quantity: 1 }]);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    const updatedProducts = selectedProducts.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Number(quantity) }
        : item
    );
    setSelectedProducts(updatedProducts);
  };

  // Recalculate total price whenever selected products or their quantity changes
  useEffect(() => {
    const newTotalPrice = selectedProducts.reduce((total, item) => {
      const product = products.find((p) => p._id === item.productId);
      if (!product) return total;

      const unitPrice = parseFloat(
        product.productUnitPrice.replace("Rs.", "").replace(",", "")
      );
      return total + unitPrice * item.quantity;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [selectedProducts, products]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "customerName") setCustomerName(value);
    if (id === "phoneNumber") setPhoneNumber(value);
    if (id === "address") setAddress(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      customerName.trim() === "" ||
      phoneNumber.trim() === "" ||
      address.trim() === "" ||
      !orderDate ||
      selectedProducts.length === 0
    ) {
      toast.error("Please fill out all required fields!");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber,
      address,
      orderDate,
      products: selectedProducts, // Now sending productId + quantity
      totalAmount: totalPrice,
    };

    try {
      await axios.post("http://localhost:6500/api/orders/", orderData);
      toast.success("Order placed successfully!");

      setCustomerName("");
      setPhoneNumber("");
      setAddress("");
      setOrderDate(new Date());
      setSelectedProducts([]);
      setTotalPrice(0);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleReset = () => {
    setCustomerName("");
    setPhoneNumber("");
    setAddress("");
    setOrderDate(new Date());
    setSelectedProducts([]);
    setTotalPrice(0);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Place New Order
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Customer Info */}
          <div>
            <label
              htmlFor="customerName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter customer name"
              value={customerName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              value={phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter delivery address"
              value={address}
              onChange={handleInputChange}
            />
          </div>

          {/* Order Date */}
          <div>
            <label
              htmlFor="orderDate"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Order Date
            </label>
            <div className="relative">
              <DatePicker
                dateFormat="MMMM d, yyyy"
                selected={orderDate}
                onChange={(date) => setOrderDate(date)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Products Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Products
            </label>
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between w-full px-3 py-2 border rounded-md"
                onClick={toggleDropdown}
              >
                <span>
                  {selectedProducts.length > 0
                    ? "Products Selected"
                    : "Select Products"}
                </span>
                <span className="text-gray-400">
                  {isDropdownOpen ? "▲" : "▼"}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border rounded-md shadow-lg max-h-60">
                  <div className="p-2 space-y-2">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={product._id}
                            checked={selectedProducts.some(
                              (p) => p.productId === product._id
                            )}
                            onChange={() => handleProductChange(product._id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            {product.productName} - {product.productUnitPrice}
                          </span>
                        </label>

                        {selectedProducts.some(
                          (p) => p.productId === product._id
                        ) && (
                          <input
                            type="number"
                            min="1"
                            value={
                              selectedProducts.find(
                                (p) => p.productId === product._id
                              )?.quantity || 1
                            }
                            onChange={(e) =>
                              handleQuantityChange(product._id, e.target.value)
                            }
                            className="w-16 px-2 py-1 ml-2 text-sm border rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="p-4 rounded-md bg-blue-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Order Total</h3>
            <p className="text-xl font-bold text-blue-700">
              Rs. {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
