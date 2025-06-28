import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { HiOutlineStar } from "react-icons/hi2";
import { PiBellRinging } from "react-icons/pi";
import { LuWallet, LuSettings } from "react-icons/lu";
import { TbLayoutDashboard } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { path: "/", icon: <TbLayoutDashboard />, label: "Dashboard" },
    { path: "/market", icon: <BsGraphUp />, label: "Market" },
    { path: "/portfolio", icon: <LuWallet />, label: "Portfolio" },
    { path: "/watchlist", icon: <HiOutlineStar />, label: "Watchlist" },
    { path: "/alerts", icon: <PiBellRinging />, label: "Alerts" },
    { path: "/settings", icon: <LuSettings />, label: "Settings" },
  ];

  const baseLinkStyles = "flex items-center gap-3 py-3 px-4 rounded-lg transition-all";
  const activeStyles = "bg-[hsl(122,39%,49%)] text-white font-semibold";
  const inactiveStyles = "text-gray-600 hover:bg-[hsl(122,39%,30%)] hover:text-white";

  return (
    <nav className="md:w-56 font-primary p-10 border-r border-gray-200 bg-gray-900 h-screen sticky w-3 top-0" aria-label="Main navigation">
      <div className="flex flex-col h-full justify-between items-center">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `${baseLinkStyles} ${isActive ? activeStyles : inactiveStyles}`
                }
                aria-current={({ isActive }) => isActive ? "page" : undefined}
              >
                <span className="text-xl md:text-lg">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

       
      </div>
    </nav>
  );
};

export default Sidebar;