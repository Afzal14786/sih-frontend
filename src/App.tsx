// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Note: Ensure these components exist and are correctly implemented.
import Header from "./Header";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Login/RegisterPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserProfile from "./Pages/User/UserProfile";

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<Dashboard userRole="farmer" userName="Md Afzal"/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
};

export default App;