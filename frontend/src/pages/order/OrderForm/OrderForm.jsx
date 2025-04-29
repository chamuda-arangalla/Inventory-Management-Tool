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
        if (res.data.allproducts?.length > 0) {
          setProducts(res.data.allproducts);
        } else {
          toast.error("No products available");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
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

    // Phone number validation: must be exactly 10 digits and only numbers
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error(
        "Phone number must be exactly 10 digits and contain only numbers!"
      );
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
    toast.success("Reset Form successfully!");
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
              data-cy="customer-name"
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
              data-cy="phone-number"
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
              data-cy="address"
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
                name="orderDate"
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
                data-cy="toggle-product-dropdown"
                className="flex items-center justify-between w-full px-3 py-2 border rounded-md"
                onClick={toggleDropdown}
              >
                {isDropdownOpen ? "Hide Products" : "Select Products"}
              </button>
              {isDropdownOpen && (
                <div className="p-4 mt-4 border rounded-md">
                  {products.map((product) => {
                    const isSelected = selectedProducts.some(
                      (p) => p.productId === product._id
                    );
                    const quantity =
                      selectedProducts.find((p) => p.productId === product._id)
                        ?.quantity || 1;

                    return (
                      <div
                        key={product._id}
                        className="flex items-center justify-between mb-2"
                      >
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleProductChange(product._id)}
                            data-cy={`product-checkbox-${product._id}`}
                          />
                          {product.productName} ({product.productUnitPrice})
                        </label>
                        {isSelected && (
                          <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) =>
                              handleQuantityChange(product._id, e.target.value)
                            }
                            data-cy={`product-quantity-${product._id}`}
                            className="w-20 px-2 py-1 border rounded"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div
          className="p-4 rounded-md bg-blue-50"
          data-cy="order-total-section"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Order Total</h3>
            <p
              className="text-xl font-bold text-blue-700"
              data-cy="order-total-amount"
            >
              Rs. {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            data-cy="reset-button"
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Form
          </button>
          <button
            type="submit"
            data-cy="submit-order-button"
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
