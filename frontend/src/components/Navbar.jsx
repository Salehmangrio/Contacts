import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.gif";

const Navbar = () => {
  return (
    <div className="min-h-screen bg-black/40 text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-3
                      bg-white/10 backdrop-blur-xl
                      border-b border-white/10
                      shadow-lg shadow-black/30">

        {/* LOGO */}
        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="contacts"
            className="h-10 w-10 object-contain drop-shadow-lg"
          />

          <span className="text-emerald-300 font-bold text-lg tracking-wide">
            CONTACTS
          </span>

        </div>

        {/* LINKS */}
        <div className="flex gap-6 text-sm">

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-300 font-semibold"
                : "text-gray-300 hover:text-emerald-300 transition"
            }
          >
            All Contacts
          </NavLink>

          <NavLink
            to="/contacts/create"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-300 font-semibold"
                : "text-gray-300 hover:text-emerald-300 transition"
            }
          >
            Create
          </NavLink>

        </div>

      </nav>

      {/* PAGE CONTENT */}
      <main className="p-4">
        <Outlet />
      </main>

    </div>
  );
};

export default Navbar;