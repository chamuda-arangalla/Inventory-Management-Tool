import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:6500/api/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const onUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:6500/api/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update order. Please try again.");
      console.error(
        "Error updating order status:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:6500/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting order:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to delete order. Please try again.");
    }
  };

  const handleDeleteClick = (orderId) => {
    setShowDeleteModal(orderId);
  };

  const confirmDelete = () => {
    if (showDeleteModal) {
      onDeleteOrder(showDeleteModal);
      setShowDeleteModal(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>
          <Link
            to="/orders/createorder"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create New Order
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table
          data-cy="orders-table"
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Customer Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Order Date
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Products Ordered
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Total Cost
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {order.products.map((product, index) => (
                        <li key={index}>
                          {product.productId?.productName || "Unknown Product"}{" "}
                          (x{product.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {order.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <select
                        data-cy={`status-select-${order._id}`}
                        value={order.status}
                        onChange={(e) =>
                          onUpdateStatus(order._id, e.target.value)
                        }
                        className="px-2 py-1 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        data-cy={`delete-button-${order._id}`}
                        onClick={() => handleDeleteClick(order._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-sm text-center text-gray-500"
                >
                  No orders found matching the selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-gray-500">
              Are you sure you want to delete this order? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                data-cy="confirm-delete-button"
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
