/** @format */

import { Link } from "@chakra-ui/react";
import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineAlert } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  return (
    <nav className="w-42 p-3 border-r-2">
      <div className="flex flex-col justify-between">
        <ul className="flex flex-col gap-5 hover:cursor-pointer text-base w-full">
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white  rounded hover:font-bold w-full">
            <a href="">
              <RiDashboardFill />
            </a>
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white  rounded hover:font-bold">
            <a href="">
              <BsGraphUp />
            </a>
            <span>Market</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500 hover:text-white rounded hover:font-bold ">
            <a href="">
              <RiDashboardFill />
            </a>
            <span>Portfolio</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white  rounded hover:font-bold">
            <a href="">
              <FaBookmark />
            </a>
            <span>Watchlist</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white  rounded hover:font-bold">
            <a href="">
              <AiOutlineAlert />
            </a>
            <span>Alerts</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white rounded hover:font-bold">
            <a href="">
              <IoMdSettings />
            </a>
            <span>Settings</span>
          </li>
          <button
            type="submit"
            className="flex items-center gap-2 hover:text-white hover:bg-green-500 rounded"
          >
            <MdLogout /> <span>Logout</span>
          </button>
        </ul>
        <div></div>
      </div>
    </nav>
  );
};

export default Sidebar;
