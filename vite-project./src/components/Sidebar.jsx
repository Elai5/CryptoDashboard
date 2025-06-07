/** @format */

import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineStar } from "react-icons/hi2";
import { PiBellRinging } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  return (
    <nav className="w-42 p-3 border-r-2">
      <div className="flex flex-col justify-between">
        <ul className="flex flex-col gap-5 hover:cursor-pointer text-base w-full">
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white  rounded hover:font-bold w-full">
            <a href="">
              <TbLayoutDashboard />
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
              <LuWallet />
            </a>
            <span>Portfolio</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white  rounded hover:font-bold">
            <a href="">
              <HiOutlineStar />
            </a>
            <span>Watchlist</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white  rounded hover:font-bold">
            <a href="">
              <PiBellRinging />
            </a>
            <span>Alerts</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-green-500  hover:text-white rounded hover:font-bold">
            <a href="">
              <LuSettings />
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
