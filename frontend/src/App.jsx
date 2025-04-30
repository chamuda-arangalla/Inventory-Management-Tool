import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import User from "./pages/user/User";
import UpdateProducts from "./pages/product/UpdateProducts";
import AddProducts from "./pages/product/AddProducts";
import Products from "./pages/product/Products";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import OrderForm from "./pages/order/OrderForm/OrderForm";
import OrdersList from "./pages/order/OrdersList/OrdersList";
import AddSupplier from "./pages/supplier/AddSupplier";
import ViewSuppliers from "./pages/supplier/ViewSuppliers";
import SupplierDetails from "./pages/supplier/SupplierDetails";
import EditSupplierDetails from "./pages/supplier/EditSupplierDetails";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <div className="main-layout">
          <Sidebar />
          <div className="page-content">
            <ToastContainer />
            <Routes>
              <Route path="/" element={<User />} />
              <Route path="/orders/createorder" element={<OrderForm />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add" element={<AddProducts />} />
              <Route path="/products/update/:id" element={<UpdateProducts />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/suppliers/add" element={<AddSupplier/>} />
              <Route path="/suppliers" element={<ViewSuppliers />} />
              <Route path="/suppliers/:id" element={<SupplierDetails />} />
              <Route path="/suppliers/update/:id" element={<EditSupplierDetails />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
