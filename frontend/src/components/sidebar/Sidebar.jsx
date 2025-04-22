import React from "react";
import {
  UsersIcon,
  ShoppingCartIcon,
  PackageIcon,
  TruckIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { id: "/", label: "User Management", icon: UsersIcon },
    { id: "/orders", label: "Order Management", icon: ShoppingCartIcon },
    { id: "/products", label: "Product Management", icon: PackageIcon },
    { id: "/suppliers", label: "Supplier Management", icon: TruckIcon },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                className={`sidebar-btn ${
                  location.pathname === item.id ? "active" : ""
                }`}
              >
                <item.icon className="sidebar-icon" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
