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
            <p>Total Invested</p>
            <span className="bold text-2xl">$ 2500</span>
            <small>Across all assets</small>
          </div>
          <div className="flex flex-col bg-blue-300 border-1 border-gray-700 rounded-md px-5 py-3">
            <p>Total Invested</p>
            <span className="bold text-2xl">$ 2500</span>
            <small>Across all assets</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
