/** @format */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const totalInvested = 2500;
  const userPortfolio = [
    {
      id: "bitcoin",
      amount: 0.01,
      avg_buy_price: 60000,
    },
    {
      id: "ethereum",
      amount: 0.3,
      avg_buy_price: 2000,
    },
    {
      id: "solana",
      amount: 5,
      avg_buy_price: 100,
    },
  ];
  const currentValue = userPortfolio.reduce((sum, coin) => {
    const liveCoin = allCoin.find((c) => c.id === coin.id);
    if (!liveCoin) return sum;
    return sum + coin.amount * liveCoin.current_price;
  }, 0);

  const todayChange = userPortfolio.reduce((sum, coin) => {
    const liveCoin = allCoin.find((c) => c.id === coin.id);
    if (!liveCoin) return sum;
    const coinValue = coin.amount * liveCoin.current_price;
    const change = coinValue * (liveCoin.price_change_percentage_24h / 100);
    return sum + change;
  }, 0);

  const profitLoss = currentValue - totalInvested;
  const gainPercent = (profitLoss / totalInvested) * 100;

  return (
    <div className="w-full">
      <div className="w-full flex flex-col px-6 py-10">
        <h1 className="text-2xl">Welcome back, James</h1>
        <p className="text-base">Here's how your crypto is doing today</p>
        <div className="w-full grid grid-cols-[2fr_2fr_2fr] px-2 py-2 gap-2">
          <div className="flex flex-col bg-blue-300 border-1 border-gray-700 rounded-md px-5 py-3">
            <p>Total Invested</p>
            <span className="bold text-2xl">
              $
              {totalInvested.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <small>Across all assets</small>
          </div>
          <div className="flex flex-col bg-blue-300 border-1 border-gray-700 rounded-md px-5 py-3">
            <p>Current Value</p>
            <span className="bold text-2xl">
              $
              {currentValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <p
              className="text-xs"
              style={{ color: gainPercent >= 0 ? "green" : "red" }}
            >
              {gainPercent >= 0 ? "+" : ""}
              {gainPercent.toFixed(2)}%
            </p>

            {/* <p className="text-xs">+11.90%</p> */}
            <small>All-time portfolio gain</small>
          </div>
          <div className="flex flex-col bg-blue-300 border-1 border-gray-700 rounded-md px-5 py-3">
            <p>Today's Profit/Loss</p>
            {/* <span className="bold text-2xl">$ 1,234.56</span> */}
            <span
              className="bold text-2xl"
              style={{ color: todayChange >= 0 ? "green" : "red" }}
            >
              $
              {todayChange.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <p
              className="text-xs"
              style={{ color: todayChange >= 0 ? "green" : "red" }}
            >
              {todayChange >= 0 ? "+" : ""}
              {((todayChange / totalInvested) * 100).toFixed(2)}%
            </p>
            {/* <p className="text-xs">+2.47%</p> */}

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
              <p
                className="price flex flex-col text-right
              "
              >
                {" "}
                $45,6876.34
                <span className="stats">+2.14%</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center px-2 py-3">
          <div className="w-full">
            <div className="w-full grid grid-cols-[70px_2fr_1fr_1fr_1fr] gap-4 bg-gradient-to-r from-blue-400 to-blue-900 px-2 py-2">
              <p className="text-sm">Rank</p>
              <p className="text-sm">Coin</p>
              <p className="text-sm">Price</p>
              <p className="text-sm">Market Cap</p>
              <p className="text-sm">24hr Change</p>
            </div>
            {displayCoin.slice(0, 10).map((item, index) => (
              <div
                className="w-full grid grid-cols-[70px_2fr_1fr_1fr_1fr] gap-4 py-1 border-1 border-gray-500"
                key={index}
              >
                <p>{item.market_cap_rank}</p>
                <div>
                  {" "}
                  <img src={item.image} alt="" className="size-8" />
                  <p>{item.name + "_" + item.symbol}</p>
                </div>

                <p>
                  {currency.symbol} {item.current_price.toLocaleString()}
                </p>
                <p>
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}
                </p>
                <p className="">
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
