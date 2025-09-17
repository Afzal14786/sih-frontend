import React, { useState } from "react";
import { FaEthereum, FaUser, FaStore, FaTruck, FaShoppingCart } from "react-icons/fa";

type UserRole = 'farmer' | 'farm' | 'distributor' | 'retailer';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [businessName, setBusinessName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add blockchain registration logic here
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert(`Registering as ${selectedRole}: ${fullName} (${email})`);
  };

  const roleOptions = [
    { value: 'farmer' as UserRole, label: 'Farmer', icon: FaUser, description: 'Individual agricultural producer' },
    { value: 'farm' as UserRole, label: 'Farm', icon: FaStore, description: 'Agricultural business or cooperative' },
    { value: 'distributor' as UserRole, label: 'Distributor', icon: FaTruck, description: 'Supply chain logistics partner' },
    { value: 'retailer' as UserRole, label: 'Retailer', icon: FaShoppingCart, description: 'Store or market selling products' },
  ];

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Name (Optional)
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder="ABC Agriculture Inc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder="********"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors"
              >
                Create Account
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