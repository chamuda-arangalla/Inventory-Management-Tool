import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import User from "./pages/user/User";
import Order from "./pages/order/Order";
import Product from "./pages/product/Product";
import Supplier from "./pages/supplier/Supplier";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <div className="main-layout">
          <Sidebar />
          <div className="page-content">
            <Routes>
              <Route path="/users" element={<User />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/products" element={<Product />} />
              <Route path="/suppliers" element={<Supplier />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
