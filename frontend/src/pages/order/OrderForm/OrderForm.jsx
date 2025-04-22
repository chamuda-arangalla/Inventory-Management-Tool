import React, { useEffect, useState } from "react";
import { CalendarIcon, XIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderForm = ({ products, onSubmit }) => {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        newTotal += product.price * quantity;
      }
    });
    setTotal(newTotal);
  }, [selectedProducts, products]);

  const validateForm = () => {
    const newErrors = {};
    if (!customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    if (!orderDate) {
      newErrors.orderDate = "Order date is required";
    }
    if (Object.keys(selectedProducts).length === 0) {
      newErrors.products = "Please select at least one product";
    }
    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      if (quantity <= 0) {
        newErrors[`quantity_${productId}`] = "Quantity must be greater than 0";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedProductsWithDetails = Object.entries(selectedProducts).map(
        ([productId, quantity]) => {
          const product = products.find((p) => p.id === productId);
          return {
            productId,
            name: product?.name,
            price: product?.price,
            quantity,
          };
        }
      );
      const order = {
        customerName,
        address,
        phoneNumber,
        orderDate,
        products: selectedProductsWithDetails,
        total,
        status: "Pending",
        id: Date.now().toString(),
      };
      onSubmit(order);
      resetForm();
    }
  };

  const resetForm = () => {
    setCustomerName("");
    setAddress("");
    setPhoneNumber("");
    setOrderDate(new Date());
    setSelectedProducts({});
    setErrors({});
  };

  const toggleProductSelection = (productId) => {
    if (selectedProducts[productId]) {
      const newSelectedProducts = { ...selectedProducts };
      delete newSelectedProducts[productId];
      setSelectedProducts(newSelectedProducts);
    } else {
      setSelectedProducts({
        ...selectedProducts,
        [productId]: 1,
      });
    }
  };

  const updateQuantity = (productId, quantity) => {
    setSelectedProducts({
      ...selectedProducts,
      [productId]: quantity,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Place New Order
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.customerName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter customer name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              }
              className={`w-full px-3 py-2 border rounded-md ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter delivery address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="orderDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Order Date
            </label>
            <div className="relative">
              <DatePicker
                selected={orderDate}
                onChange={(date) => setOrderDate(date)}
                dateFormat="MMMM d, yyyy"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.orderDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.orderDate && (
              <p className="text-red-500 text-sm mt-1">{errors.orderDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Products
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProductDropdown(!showProductDropdown)}
                className={`w-full px-3 py-2 border rounded-md text-left flex justify-between items-center ${
                  errors.products ? "border-red-500" : "border-gray-300"
                }`}
              >
                <span>
                  {Object.keys(selectedProducts).length > 0
                    ? `${
                        Object.keys(selectedProducts).length
                      } products selected`
                    : "Select products"}
                </span>
                <span className="text-gray-500">▼</span>
              </button>
              {showProductDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {products.map((product) => (
                    <label
                      key={product.id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={!!selectedProducts[product.id]}
                        onChange={() => toggleProductSelection(product.id)}
                        className="mr-2"
                      />
                      <span>{product.name}</span>
                      <span className="ml-auto text-gray-500">
                        ${product.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {errors.products && (
              <p className="text-red-500 text-sm mt-1">{errors.products}</p>
            )}
          </div>
        </div>
        {Object.keys(selectedProducts).length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Selected Products
            </h3>
            <div className="space-y-4">
              {Object.entries(selectedProducts).map(([productId, quantity]) => {
                const product = products.find((p) => p.id === productId);
                return (
                  <div
                    key={productId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{product?.name}</p>
                      <p className="text-sm text-gray-500">
                        ${product?.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center">
                      <label className="mr-2 text-sm text-gray-700">
                        Quantity:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          updateQuantity(
                            productId,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className={`w-16 px-2 py-1 border rounded-md ${
                          errors[`quantity_${productId}`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => toggleProductSelection(productId)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                    {errors[`quantity_${productId}`] && (
                      <p className="text-red-500 text-sm ml-2">
                        {errors[`quantity_${productId}`]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Order Total</h3>
            <p className="text-xl font-bold text-blue-700">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
