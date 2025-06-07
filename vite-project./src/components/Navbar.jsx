/** @format */

import { MdDashboard } from "react-icons/md";
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { BiSearch } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import Home from "./Home";
import Sidebar from "./Sidebar";
import { CoinContext } from "../context/CoinContext";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "": {
        setCurrency({ name: "ksh", symbol: "KES" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  // const { setCurrency } = useContext(CoinContext);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-5 py-2 border-b-1 border-gray-300">
        <div className="flex w-1/3 gap-2">
          <img className="size-8" src={assets.logo} alt="" />
          <span className="text-xl">BitFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <form
            action=""
            className="flex items-center border-1 border-gray-300 rounded h-7  bg-white text-black px-2"
          >
            <BiSearch className="text-gray-400 flex items-center" />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search crypto,markets..."
              className="px-4 text-xs border-2 border-none outline-none rounded-md"
            />
            {/* <button
              type="submit"
              className="border-1 border-gray-400 rounded text-xs bg-purple-700 text-white px-4 py-1"
            >
              Search
            </button> */}
          </form>
          <select
            name=""
            id=""
            onChange={currencyHandler}
            className="hover:cursor-pointer hover:border-none outline-none"
          >
            <option value="usd">USD</option>
            <option value="ksh">KSH</option>
            <option value="eur">EUR</option>
          </select>
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
