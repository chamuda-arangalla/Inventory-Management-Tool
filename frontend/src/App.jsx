import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import User from "./pages/user/User";
import OrderManagement from "./pages/order/OrderManagement/OrderManagement";
import AddProducts from "./pages/product/AddProducts";
import Supplier from "./pages/supplier/Supplier";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <div className="main-layout">
          <Sidebar />
          <div className="page-content">
            <ToastContainer/>
            <Routes>
              <Route path="/" element={<User />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/products/add" element={<AddProducts />} />
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
