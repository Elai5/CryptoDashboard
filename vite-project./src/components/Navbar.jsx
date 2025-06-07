/** @format */

import { VStack, Link, List, ListItem } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import React from "react";
import { assets } from "../assets/assets";
import { MdSearch } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import Home from "./Home";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-2 border-b-1 ">
        <div className="flex w-1/3 gap-2">
          <img className="size-8" src={assets.logo} alt="" />
          <span className="text-xl">BitFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <form
            action=""
            className="flex justify-between items-center border-2 border-black rounded w-82 h-8  bg-white text-black"
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="Search crypto,markets..."
              className="px-4 text-xs border-2 border-none outline-none rounded-md"
            />
            <button
              type="submit"
              className="border-1 border-gray-400 rounded text-xs bg-purple-700 text-white px-4 py-1"
            >
              Search
            </button>
          </form>
          <FaBell />

          <img
            src={assets.avator}
            alt=""
            className="w-8 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
};

export default Navbar;
