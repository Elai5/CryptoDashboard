/** @format */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Home = ({ coins }) => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const totalInvested = 45789.25;
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

  const portfolioCoins = userPortfolio
    .map((portfolioCoins) => allCoin.find((c) => c.id === portfolioCoins.id))
    .filter(Boolean);

  const [chartData, setChartData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  //   useEffect(() => {
  //     const fetchChartData = async () => {
  //       try {
  //         const res = await fetch(
  //           "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
  //         );
  //         const data = await res.json();
  //         const formattedData = data.prices.map(([time, price]) => ({
  //           time: new Date(time).toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           }),
  //           price: price.toFixed(2),
  //         }));
  //         setGraphData(formattedData);
  //       } catch (error) {
  //         console.error("Error fetching chart data:", error);
  //       }
  //     };

  //     fetchChartData();
  //   }, []);
  const fetchChartData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=${currency.name}&days=1`
      );
      const data = await response.json();

      const formattedData = data.prices.map((price) => {
        return {
          time: new Date(price[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: price[1],
        };
      });
      setChartData(formattedData);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();

    const interval = setInterval(() => {
      fetchChartData();
    }, 300000);

    return () => clearInterval(interval);
  }, [selectedCoin, currency]);

  return (
    <div className="mx-auto max-w-full pt-15">
      <div className="w-full flex flex-col px-2 sm:px-4 md:px-6 py-5 gap-2">
        <h1 className="text-2xl">Welcome back, James</h1>
        <p className="text-base">Here's how your crypto is doing today</p>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 px-2 py-2 gap-2">
          <div className="flex flex-col border-1 border-gray-300 rounded-md px-5 py-3">
            <p className="text-sm text-[hsl(60,1%,52%)] mb-1">Total Invested</p>
            <span className="font-extrabold text-base">
              {currency.symbol}
              {totalInvested.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <small className="text-xs ">Across all assets</small>
          </div>
          <div className="flex flex-col border-1 border-gray-300 rounded-md px-5 py-3">
            <p className="text-sm text-[hsl(60,1%,52%)] mb-1">Current Value</p>
            <span className="font-extrabold text-base ">
              {currency.symbol}
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
          <div className="flex flex-col border-1 border-gray-300 rounded-md px-5 py-3">
            <p className="text-sm text-[hsl(60,1%,52%)] mb-1">
              Today's Profit/Loss
            </p>
            {/* <span className="bold text-2xl">$ 1,234.56</span> */}
            <span
              className="font-extrabold text-base"
              //   style={{ color: todayChange >= 0 ? "green" : "red" }}
            >
              {currency.symbol}
              {todayChange.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <p
              className="text-xs "
              style={{ color: todayChange >= 0 ? "green" : "red" }}
            >
              {todayChange >= 0 ? "+" : ""}
              {((todayChange / totalInvested) * 100).toFixed(2)}%
            </p>
            {/* <p className="text-xs">+2.47%</p> */}

            <small>Since last 24 hours</small>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] px-2 gap-3 ">
          <div className="chart rounded-md border-1 border-gray-300">
            <div className="bg-white chart rounded-md border-1 border-gray-300 p-3">
              <div className="flex justify-between">
                {" "}
                <h3 className="text-xs md:text-sm font-bold mb-2">
                  Bitcoin Price (24h)
                </h3>
                <select
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                  className="mb-5 p-2 border border-gray-300 rounded outline-none bg-gray-100 text-sm"
                >
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="solana">Solana (SOL)</option>
                  <option value="dogecoin">Dogecoin (DOGE)</option>
                  <option value="cardano">Cardano (ADA)</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis
                    className="text-xs md:text-base"
                    dataKey="time"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    className="text-xs md:text-base"
                    domain={["auto", "auto"]}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#00b894"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col border border-gray-300 rounded-md ">
            <h2 className="text-sm font-semibold md:text-base py-2 md:py-5 px-1 md:px-3 font-primary md:font-normal ">
              Quick Stats
            </h2>
            {portfolioCoins.map((coin) => (
              <div className="flex items-center border-b border-gray-300 px-1 md:px-2">
                <div
                  key={coin.id}
                  className="w-full flex items-center justify-between md:grid md:grid-cols-[40px_3fr_2fr] md:gap-3 "
                >
                  <p className="image flex md:block py-2">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  </p>

                  <p className="name flex flex-col p-2 rounded text-xs md:text-base">
                    {coin.name}
                    <span className="text-xs uppercase text-[hsl(60,1%,52%)]">
                      {coin.symbol}
                    </span>
                  </p>

                  <p className="price flex flex-col text-right text-xs md:text-sm font-bold">
                    {currency.symbol}
                    {coin.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                    <span
                      className="stats text-xs"
                      style={{
                        color:
                          coin.price_change_percentage_24h >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>
            ))}
            {/* <div className="w-full grid grid-cols-[1fr_3fr_2fr] gap-3">
              
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
            </div> */}
          </div>
        </div>
        {/* <div className="flex items-center px-2">
          <div className="w-full border border-gray-300 rounded-md flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-semibold px-1 md:px-5 mt-4">
              Top Cryptocurrencies by Market Cap
            </h2>
            <div className="w-full grid grid-cols-3 md:grid-cols-[70px_2fr_1fr_1fr_1fr] gap-4 bg-gray-100 px-2 py-2 text-[hsl(60,1%,52%)] text-sm">
              <p className="text-sm">Rank</p>
              <p className="text-sm">Coin</p>
              <p className="hidden md:flex text-sm">Price</p>
              <p className="text-sm">Market Cap</p>
              <p className="hidden md:flex text-sm">24hr Change</p>
            </div>
            {displayCoin.slice(0, 10).map((item, index) => (
              <div className="md:w-full flex items-center">
                <div
                  className="w-full grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[70px_2fr_1fr_1fr_1fr] gap-4 border-b border-gray-300 "
                  key={index}
                >
                  <p className="flex items-center px-2 text-sm md:text-base">
                    {item.market_cap_rank}
                  </p>
                  <div>
                    {" "}
                    <img src={item.image} alt="" className="size-8" />
                    <p className="text-sm md:text-base">
                      {item.name + "_" + item.symbol}
                    </p>
                  </div>

                  <p className="hidden md:flex items-center text-sm md:text-base">
                    {currency.symbol} {item.current_price.toLocaleString()}
                  </p>
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

                  <p className=" hidden md:flex items-center">
                    {currency.symbol}
                    {item.market_cap.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
