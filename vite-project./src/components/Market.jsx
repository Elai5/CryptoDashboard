/** @format */
/**
 * Market component
 *
 * Displays the top 10 cryptocurrencies by market capitalization.
 * Data is fetched from the global CoinContext and updated via useEffect.
 * Responsive layout adapts column visibility based on screen size.
 */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";

const Market = () => {
  // Access global state: list of all coins and selected currency
  const { allCoin, currency } = useContext(CoinContext);

  // Local state to manage which coins are shown in the UI
  const [displayCoin, setDisplayCoin] = useState([]);

  // Sync local displayCoin with updated global allCoin data
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div id="market" className="w-full flex justify-center py-5 ">
      <div className="flex justify-center items-center px-2">
        <div className="w-full border border-gray-300 rounded-md flex flex-col gap-3">
          <h2 className="text-sm md:text-base font-semibold px-1 md:px-5 mt-4">
            Top Cryptocurrencies by Market Cap
          </h2>
          {/* Header row (changes based on screen size) */}
          <div className="w-full grid grid-cols-3 md:grid-cols-[70px_2fr_1fr_1fr_1fr] gap-4 bg-gray-100 px-2 py-2 text-[hsl(60,1%,52%)] text-sm">
            <p className="text-sm">Rank</p>
            <p className="text-sm">Coin</p>
            <p className="hidden md:flex text-sm">Price</p>
            <p className="text-sm">Market Cap</p>
            <p className="hidden md:flex text-sm">24hr Change</p>
          </div>

          {/* Render top 10 coins */}
          {displayCoin.slice(0, 10).map((item, index) => (
            <div className="md:w-full flex items-center">
              <div
                className="w-full grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[70px_2fr_1fr_1fr_1fr] gap-4 border-b border-gray-300 "
                key={index}
              >
                {/* Market Cap Rank */}
                <p className="flex items-center px-2 text-sm md:text-base">
                  {item.market_cap_rank}
                </p>
                {/* Coin image and name */}
                <div>
                  {" "}
                  <img src={item.image} alt="" className="size-8" />
                  <p className="text-sm md:text-base">
                    {item.name + "_" + item.symbol}
                  </p>
                </div>

                {/* 24hr price change (red for loss, green for gain) */}
                <p className="hidden md:flex items-center text-sm md:text-base">
                  {currency.symbol} {item.current_price.toLocaleString()}
                </p>
                {/* 24hr Price Change */}
                <p
                  className={`text-right flex items-center text-sm md:text-base ${
                    item.price_change_percentage_24h > 0
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {(
                    Math.floor(item.price_change_percentage_24h * 100) / 100
                  ).toFixed(2)}
                </p>
                {/* Market Cap (only visible on md screens and up) */}
                <p className=" hidden md:flex items-center pr-1">
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
