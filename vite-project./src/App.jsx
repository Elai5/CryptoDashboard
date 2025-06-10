/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Market from "./components/Market";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex h-screen pt-10">
        {" "}
        {/* pt-16 for Navbar height offset */}
        <aside className=" sticky h-screen">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            {/* add more routes here */}
          </Routes>
        </main>
      </div>
      {/* <Navbar />
       <Sidebar />
      <div className="mask-origin-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </div> */}
    </Router>
  );
};

export default App;
