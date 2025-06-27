/** @format */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Market from "./components/Market";
import Signup from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex h-screen pt-16"> {/* Changed pt-10 to pt-16 to account for navbar height */}
        <aside className="sticky h-screen">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;