/** @format */

import React from "react";
import { Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Market from "./components/Market";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Sidebar /> */}
      {/* <Home /> */}
      <Market />
    </div>
  );
};

export default App;
