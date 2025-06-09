/** @format */

import { MdDashboard } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
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
      case "gbp": {
        setCurrency({ name: "gbp", symbol: "£" });
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

  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  // const { setCurrency } = useContext(CoinContext);
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex items-center justify-between px-1 md:px-5 py-2 border-b-1 border-gray-300 ">
        <div className="flex w-20 gap-2 items-center">
          <img
            className="md:flex w-1/2 rounded "
            src={assets.logo4}
            alt="logoImage"
          />
          <span className="hidden md:flex items-center md:text-2xl font-tertiary font-semibold">
            BitFlow
          </span>
        </div>
        <div className="flex items-center gap-3">
          <form
            onSubmit={searchHandler}
            action=""
            className="hidden md:flex items-center border-1 border-gray-300 rounded h-7  bg-white text-black px-2"
          >
            <BiSearch className="text-gray-400 flex items-center" />
            <input
              type="text"
              name=""
              id=""
              onChange={inputHandler}
              list="coinlist"
              value={input}
              placeholder="Search crypto,markets..."
              className="px-4 text-xs border-2 border-none outline-none rounded-md"
              required
            />
            <datalist id="coinlist">
              {allCoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>
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
            <option value="gbp">GBP</option>
            <option value="eur">EUR</option>
          </select>
          <FaBell />
          <div className="flex items-center justify-center">
            <img
              src={assets.man2}
              alt=""
              className="size-8 md:size-12 rounded-full object-cover border-1 border-gray-100"
            />
          </div>
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
