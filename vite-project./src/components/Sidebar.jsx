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
    <nav className="md:w-60 p-3 border-1 border-gray-300  rounded">
      <div className="flex flex-col justify-between">
        <ul className="flex flex-col gap-1 hover:cursor-pointer text-base w-full">
          <li className="flex items-center gap-2 py-2 px-1 bg-[hsl(122,39%,49%)] text-white  hover:text-white  rounded hover:font-bold">
            <a href="" className="text-2xl md:text-base ">
              <TbLayoutDashboard />
            </a>
            <span className="hidden md:flex">Dashboard</span>
          </li>
          <li className="flex items-center gap-2 py-2 px-1 hover:bg-[hsl(122,39%,49%)]  hover:text-white  rounded hover:font-bold">
            <a href="" className="text-2xl md:text-base ">
              <BsGraphUp />
            </a>
            <span className="hidden md:flex">Market</span>
          </li>
          <li className="flex items-center gap-2 py-2 px-1 hover:bg-[hsl(122,39%,49%)] hover:text-white rounded hover:font-bold ">
            <a href="" className="text-2xl md:text-base ">
              <LuWallet />
            </a>
            <span className="hidden md:flex">Portfolio</span>
          </li>
          <li className="flex items-center gap-2 py-2 px-1 hover:bg-[hsl(122,39%,49%)]  hover:text-white  rounded hover:font-bold">
            <a href="" className="text-2xl md:text-base ">
              <HiOutlineStar />
            </a>
            <span className="hidden md:flex">Watchlist</span>
          </li>
          <li className="flex items-center gap-2 py-2 px-1 hover:bg-[hsl(122,39%,49%)]  hover:text-white  rounded hover:font-bold">
            <a href="" className="text-2xl md:text-base ">
              <PiBellRinging />
            </a>
            <span className="hidden md:flex">Alerts</span>
          </li>
          <li className="flex items-center gap-2  py-2 px-1 hover:bg-[hsl(122,39%,49%)]  hover:text-white rounded hover:font-bold">
            <a href="" className="text-2xl md:text-base ">
              <LuSettings />
            </a>
            <span className="hidden md:flex">Settings</span>
          </li>
          <button
            type="submit"
            className="flex items-center gap-2 py-2 px-1 hover:text-white hover:bg-[hsl(122,39%,49%)] rounded text-2xl md:text-base"
          >
            <MdLogout /> <span className="hidden md:flex">Logout</span>
          </button>
        </ul>
        <div></div>
      </div>
    </nav>
  );
};

export default Sidebar;
