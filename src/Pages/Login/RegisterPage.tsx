import React, { useState, useMemo } from "react";
import { FaEthereum, FaUser, FaStore, FaTruck, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type UserRole = 'farmer' | 'farm' | 'distributor' | 'retailer' | 'admin';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Corrected URL and added withCredentials for session cookies
      const response = await axios.post(
        "http://localhost:5174/api/v1/user/register",
        { 
          username: fullName, // Backend expects 'username'
          email, 
          password, 
          role: selectedRole 
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Navigate to login page after successful registration
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message || "Registration failed. Please try again.");
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'farmer' as UserRole, label: 'Farmer', icon: FaUser, description: 'Individual agricultural producer' },
    { value: 'farm' as UserRole, label: 'Farm', icon: FaStore, description: 'Agricultural business or cooperative' },
    { value: 'distributor' as UserRole, label: 'Distributor', icon: FaTruck, description: 'Supply chain logistics partner' },
    { value: 'retailer' as UserRole, label: 'Retailer', icon: FaShoppingCart, description: 'Store or market selling products' },
  ];

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = useMemo(() => {
    return email && fullName && selectedRole && passwordsMatch;
  }, [email, fullName, selectedRole, passwordsMatch]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-green-300 px-4 py-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <FaEthereum className="text-green-600 text-4xl mr-2" />
          <h1 className="text-3xl font-bold text-green-700">AgriChain Registration</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roleOptions.map((role) => {
                const IconComponent = role.icon;
                return (
                  <div
                    key={role.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedRole === role.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedRole(role.value)}
                  >
                    <div className="flex items-center mb-2">
                      <IconComponent className="text-green-600 text-xl mr-2" />
                      <span className="font-semibold text-gray-800">{role.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedRole && (
            <>
              {/* Basic Information */}
              <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {selectedRole === 'farm' ? 'Farm Name' : 'Full Name'}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder={selectedRole === 'farm' ? "Sunshine Farms" : "John Doe"}
                    disabled={loading}
                  />
              </div>

              <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder="you@example.com"
                    disabled={loading}
                  />
              </div>

              {/* Password Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder="********"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`mt-1 block w-full rounded-md border ${
                      confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-gray-300'
                    } px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                    placeholder="********"
                    disabled={loading}
                  />
                </div>
              </div>

              {!passwordsMatch && (
                  <p className="text-red-500 text-sm mt-2 text-center">Passwords must match</p>
              )}

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full text-white font-semibold py-3 rounded-md transition-colors ${
                  isFormValid && !loading ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
