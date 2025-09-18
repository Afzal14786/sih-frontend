// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./Header";
import { UserProvider } from "./UserContext";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Login/RegisterPage";
import UserProfile from "./Pages/User/UserProfile";
import SellCropForm from "./Pages/SellCrop/SellCropForm";
import ProtectedDashboard from "./ProtectedDashboard";
import Home from "./Pages/Home/Home"

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/sell" element={<SellCropForm />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
