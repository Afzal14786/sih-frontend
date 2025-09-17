// src/components/Header.tsx
import React, { useState } from "react";
import { FaEthereum, FaBars, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <FaEthereum className="text-green-600 text-3xl" />
            <span className="font-bold text-xl text-green-700 select-none">
              AgriChain
            </span>
          </div>

          {/* Right: Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="/products"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Products
            </a>
            <a
              href="/login"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 font-semibold transition-colors"
            >
              Sign Up
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
            >
              {menuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </a>
            <a
              href="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
            <a
              href="/signup"
              className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-green-600 hover:bg-green-700"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;