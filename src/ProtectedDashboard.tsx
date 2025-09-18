import React, { useContext } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

const ProtectedDashboard: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext || userContext.isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const { user } = userContext;

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Type guard
  const isValidRole = (role: string): role is "farmer" | "distributor" | "retailer" | "admin" => {
    return ["farmer", "distributor", "retailer", "admin"].includes(role);
  };

  if (!isValidRole(user.role)) {
    return <Navigate to="/login" />;
  }

  return <Dashboard userRole={user.role} userName={user.username} />;
};

export default ProtectedDashboard;
