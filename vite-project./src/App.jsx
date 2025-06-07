/** @format */

import React from "react";
import { Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default App;
