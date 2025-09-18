import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaEthereum, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Header must be used within a UserProvider");
  }

  const { user, setUser, isLoading } = userContext;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5174/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null); // Clear user state in context
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", err);
    } finally {
      setMenuOpen(false);
    }
  };

  const handleProfile = () => {
    setMenuOpen(false);
    // You'll need to create this route
    navigate("/profile");
  };

  const goTo = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  // Conditionally render based on loading state
  if (isLoading) {
    return (
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      </header>
    );
  }

  const renderMenuItems = () => {
    if (!user) {
      // Not logged in
      return (
        <>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => goTo("/sell")}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Sell
            </button>
            <button
              onClick={() => goTo("/purchase")}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Purchase
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <button
              onClick={() => goTo("/login")}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => goTo("/signup")}
              className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </div>
        </>
      );
    }

    // Logged in
    const isFarmer = user.role === "farmer";
    const isRetailer = user.role === "retailer";
    const isDistributor = user.role === "distributor";
    const isAdmin = user.role === "admin";

    return (
      <>
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={handleProfile}
            className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            aria-label="User Profile"
          >
            <span className="hidden sm:inline">{user.username}</span>
          </button>
          
          {(isFarmer || isDistributor) && (
            <button
              onClick={() => goTo("/sell")}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Sell
            </button>
          )}
          {(isRetailer || isDistributor) && (
            <button
              onClick={() => goTo("/purchase")}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Purchase
            </button>
          )}

          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-green-600 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </>
    );
  };

  const renderMobileMenuItems = () => {
    if (!user) {
      return (
        <>
          <button
            onClick={() => goTo("/sell")}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 w-full text-left"
          >
            Sell
          </button>
          <button
            onClick={() => goTo("/purchase")}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 w-full text-left"
          >
            Purchase
          </button>
          <button
            onClick={() => goTo("/login")}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 w-full text-left"
          >
            Login
          </button>
          <button
            onClick={() => goTo("/signup")}
            className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-green-600 hover:bg-green-700 w-full text-left"
          >
            Sign Up
          </button>
        </>
      );
    }

    const isFarmer = user.role === "farmer";
    const isRetailer = user.role === "retailer";
    const isDistributor = user.role === "distributor";

    return (
      <>
        {(isFarmer || isDistributor) && (
          <button
            onClick={() => goTo("/sell")}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 w-full text-left"
          >
            Sell
          </button>
        )}
        {(isRetailer || isDistributor) && (
          <button
            onClick={() => goTo("/purchase")}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 w-full text-left"
          >
            Purchase
          </button>
        )}
        <button
          onClick={handleProfile}
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 w-full"
        >
          <FaUser className="text-2xl" />
          <span>{user.username}</span>
        </button>
        <button
          onClick={handleLogout}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 w-full text-left"
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <FaEthereum className="text-green-600 text-3xl" />
            <Link to="/">
              <span className="font-bold text-xl text-green-700 select-none">
                AgriChain
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center">{renderMenuItems()}</nav>

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

      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {renderMobileMenuItems()}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
