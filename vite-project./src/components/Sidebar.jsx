/** @format */

import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineStar } from "react-icons/hi2";
import { PiBellRinging } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const baseLinkStyles =
    "flex items-center gap-2 py-2 px-1 rounded text-2xl md:text-base";
  return (
    <nav className="md:w-50 p-3 border-1 border-gray-300 rounded mt-10 h-screen ">
      <div className="flex flex-col justify-between">
        <ul className="flex flex-col gap-1 hover:cursor-pointer text-base w-full">
          <li className="flex items-center  text-white  hover:text-white  rounded hover:font-bold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? baseLinkStyles +
                    " bg-[hsl(122,39%,49%)] text-white font-bold w-full"
                  : baseLinkStyles +
                    " text-gray-700 hover:bg-[hsl(122,39%,49%)] hover:text-white"
              }
              end
            >
              <TbLayoutDashboard />
              <span className="hidden md:flex">Dashboard</span>
            </NavLink>
          </li>
          <li className="flex items-center hover:bg-[hsl(122,39%,49%)]  hover:text-white  rounded hover:font-bold">
            <NavLink
              to="/market"
              className={({ isActive }) =>
                isActive
                  ? baseLinkStyles +
                    " bg-[hsl(122,39%,49%)] text-white font-bold w-full"
                  : baseLinkStyles +
                    " text-gray-700 hover:bg-[hsl(122,39%,49%)] hover:text-white"
              }
            >
              <BsGraphUp />
              <span className="hidden md:flex">Market</span>
            </NavLink>
          </li>
          <li className="flex items-center hover:bg-[hsl(122,39%,49%)] hover:text-white rounded hover:font-bold ">
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                isActive
                  ? baseLinkStyles +
                    " bg-[hsl(122,39%,49%)] text-white font-bold w-full"
                  : baseLinkStyles +
                    " text-gray-700 hover:bg-[hsl(122,39%,49%)] hover:text-white"
              }
            >
              <LuWallet />
              <span className="hidden md:flex">Portfolio</span>
            </NavLink>
          </li>
          <li className="flex items-center  hover:bg-[hsl(122,39%,49%)]  hover:text-white  rounded hover:font-bold">
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                isActive
                  ? baseLinkStyles +
                    " bg-[hsl(122,39%,49%)] text-white font-bold w-full"
                  : baseLinkStyles +
                    " text-gray-700 hover:bg-[hsl(122,39%,49%)] hover:text-white"
              }
            >
              <HiOutlineStar />
              <span className="hidden md:flex">Watchlist</span>
            </NavLink>
          </li>
          <li className="flex items-center hover:bg-[hsl(122,39%,49%)]  hover:text-white  rounded hover:font-bold">
            <NavLink
              to="/alerts"
              className={({ isActive }) =>
                isActive
                  ? baseLinkStyles +
                    " bg-[hsl(122,39%,49%)] text-white font-bold w-full"
                  : baseLinkStyles +
                    " text-gray-700 hover:bg-[hsl(122,39%,49%)] hover:text-white"
              }
            >
              <PiBellRinging />
              <span className="hidden md:flex">Alerts</span>
            </NavLink>
          </li>
          <li className="flex items-center hover:bg-[hsl(122,39%,49%)]  hover:text-white rounded hover:font-bold">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? baseLinkStyles +
                    " bg-[hsl(122,39%,49%)] text-white font-bold w-full"
                  : baseLinkStyles +
                    " text-gray-700 hover:bg-[hsl(122,39%,49%)] hover:text-white"
              }
            >
              <LuSettings />
              <span className="hidden md:flex">Settings</span>
            </NavLink>
          </li>
          <button
            type="submit"
            className="flex items-center gap-2 py-2 px-1 hover:text-white hover:bg-[hsl(122,39%,49%)] rounded text-2xl md:text-base"
          >
            <MdLogout />{" "}
            <span className="hidden md:flex text-gray-700">Logout</span>
          </button>
        </ul>
        <div></div>
      </div>
    </nav>
  );
};

export default Sidebar;
