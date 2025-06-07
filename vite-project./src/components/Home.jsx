/** @format */

import React from "react";

const Home = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col px-6 py-10">
        <h1 className="text-2xl">Welcome back, James</h1>
        <p className="text-base">Here's how your crypto is doing today</p>
        <div className="w-full grid grid-cols-[2fr_2fr_2fr] px-2 py-2 gap-2">
          <div className="flex flex-col bg-blue-300 border-1 border-gray-700 rounded-md px-5 py-3">
            <p>Total Invested</p>
            <span className="bold text-2xl">$ 2500</span>
            <small>Across all assets</small>
          </div>
          <div className="flex flex-col bg-blue-300 border-1 border-gray-700 rounded-md px-5 py-3">
            <p>Current Value</p>
            <span className="bold text-2xl">$ 2500</span>
            <small>All-time portfolio gain</small>
          </div>
          <div className="flex flex-col bg-blue-300 border-1 border-gray-700 rounded-md px-5 py-3">
            <p>Total Invested</p>
            <span className="bold text-2xl">$ 2500</span>
            <small>Since last 24 hours</small>
          </div>
        </div>
        <div className="w-full grid grid-cols-[2fr_1fr] px-2 gap-3">
          <div className=" bg-blue-300 chart">HELLO WORLD</div>
          <div className=" flex flex-col">
            <h2 className="text-2xl  bg-red-500 py-5 px-5">Quick Stat</h2>
            <div className="w-full grid grid-cols-[1fr_3fr_2fr] gap-3">
              <p className="image">IMG</p>
              <p className="name flex flex-col bg-green-700">
                Bitcoin
                <span>BTC</span>
              </p>
              <p className="price flex flex-col text-right
              ">
                {" "}
                $45,6876.34
                <span className="stats">+2.14%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
