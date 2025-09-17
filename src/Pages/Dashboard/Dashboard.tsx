import React from "react";
import {
  FaSeedling,
  FaTruck,
  FaChartLine,
  FaBell,
  FaUser, 
  FaCircle,
  FaEthereum,
  FaClipboardList,
} from "react-icons/fa";

type UserRole = "farmer" | "farm" | "distributor" | "retailer";

interface DashboardProps {
  userRole: UserRole;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, userName }) => {
  // Sample data placeholders
  const recentTransactions = [
    { id: 1, description: "Order #1234 confirmed on blockchain", date: "2024-06-01" },
    { id: 2, description: "Shipment #5678 dispatched", date: "2024-05-30" },
  ];

  const notifications = [
    { id: 1, message: "New order received", date: "2024-06-02" },
    { id: 2, message: "Blockchain network stable", date: "2024-06-01" },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6 md:p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <FaEthereum className="text-green-700 text-4xl" />
          <h1 className="text-3xl font-bold text-green-900">AgriChain Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <FaUser className="text-green-700 text-3xl" />
          <span className="font-semibold text-green-900">{userName}</span>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Quick Stats */}
        <section className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Stats</h2>

          {userRole === "farmer" || userRole === "farm" ? (
            <>
              <div className="flex items-center space-x-4">
                <FaSeedling className="text-green-600 text-3xl" />
                <div>
                  <p className="text-gray-600">Active Crops</p>
                  <p className="text-2xl font-bold text-green-800">12</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaClipboardList className="text-green-600 text-3xl" />
                <div>
                  <p className="text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-green-800">5</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <FaTruck className="text-green-600 text-3xl" />
                <div>
                  <p className="text-gray-600">Shipments In Transit</p>
                  <p className="text-2xl font-bold text-green-800">8</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaChartLine className="text-green-600 text-3xl" />
                <div>
                  <p className="text-gray-600">Monthly Sales</p>
                  <p className="text-2xl font-bold text-green-800">$24,500</p>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Middle Panel: Recent Activity */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-green-200">
            {recentTransactions.map((tx) => (
              <li key={tx.id} className="py-2">
                <p className="text-green-900 font-medium">{tx.description}</p>
                <p className="text-sm text-green-600">{tx.date}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Right Panel: Notifications & Blockchain Status */}
        <section className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-4">Notifications</h2>
            <ul className="divide-y divide-green-200 max-h-48 overflow-y-auto">
              {notifications.map((note) => (
                <li key={note.id} className="py-2">
                  <p className="text-green-900">{note.message}</p>
                  <p className="text-sm text-green-600">{note.date}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-green-200 pt-4">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Blockchain Status</h2>
            <div className="flex items-center space-x-3">
              <FaEthereum className="text-green-600 text-2xl" />
              <div>
                <p className="text-green-900 font-medium">Network: Healthy</p>
                <p className="text-sm text-green-600">Latest Block: #1234567</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;