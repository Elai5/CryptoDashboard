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
    <nav className="max-h-screen w-42 p-3 bg-blue-200">
      <div className="flex flex-col justify-between h-screen">
        <ul className="flex flex-col hover:cursor-pointer text-base">
          <li className="flex items-center gap-2 hover:bg-green-500 rounded hover:font-bold">
            <a href="">
              <RiDashboardFill />
            </a>
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500 rounded hover:font-bold">
            <a href="">
              <BsGraphUp />
            </a>
            <span>Market</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500 rounded hover:font-bold ">
            <a href="">
              <RiDashboardFill />
            </a>
            <span>Portfolio</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500 rounded hover:font-bold">
            <a href="">
              <FaBookmark />
            </a>
            <span>Watchlist</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500 rounded hover:font-bold">
            <a href="">
              <AiOutlineAlert />
            </a>
            <span>Alerts</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500 rounded hover:font-bold">
            <a href="">
              <IoMdSettings />
            </a>
            <span>Settings</span>
          </li>
        </ul>
        <div>
          <button type="submit" className="flex items-center gap-2">
            <MdLogout /> <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
