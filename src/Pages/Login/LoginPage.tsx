import React, { useState, useContext } from "react";
import { FaEthereum } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../UserContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5174/api/v1/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { user } = response.data;

      // Update context and localStorage
      if (userContext) {
        userContext.setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-green-300 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <FaEthereum className="text-green-600 text-4xl mr-2" />
          <h1 className="text-3xl font-bold text-green-700">AgriChain Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold py-2 rounded-md transition-colors`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to AgriChain?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;