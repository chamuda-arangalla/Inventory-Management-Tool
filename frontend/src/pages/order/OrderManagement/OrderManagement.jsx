import React, { useState } from "react";
import OrderForm from "../OrderForm/OrderForm";
import OrdersList from "../OrdersList/OrdersList";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [activeView, setActiveView] = useState("form");

  return (
    <div className="order-management-container">
      <div className="header">
        <h1 className="title">Order Management</h1>
        <div className="button-group">
          <button
            onClick={() => setActiveView("form")}
            className={`toggle-button ${activeView === "form" ? "active" : ""}`}
          >
            Place Order
          </button>
          <button
            onClick={() => setActiveView("list")}
            className={`toggle-button ${activeView === "list" ? "active" : ""}`}
          >
            Orders List
          </button>
        </div>
      </div>

      {activeView === "form" ? <OrderForm /> : <OrdersList />}
    </div>
  );
};

export default OrderManagement;
