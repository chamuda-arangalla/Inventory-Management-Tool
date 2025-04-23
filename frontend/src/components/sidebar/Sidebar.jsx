import React from "react";
import {
  UsersIcon,
  ShoppingCartIcon,
  PackageIcon,
  TruckIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { id: "/", label: "User Management", icon: UsersIcon },
    { id: "/orders", label: "Order Management", icon: ShoppingCartIcon },
    { id: "/products", label: "Product Management", icon: PackageIcon },
    { id: "/suppliers", label: "Supplier Management", icon: TruckIcon },
  ];

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-gray-800 to-indigo-900 text-white shadow-lg">
      <nav className="p-6">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 hover:bg-indigo-800 ${
                  location.pathname === item.id ? "bg-indigo-800 font-semibold" : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
