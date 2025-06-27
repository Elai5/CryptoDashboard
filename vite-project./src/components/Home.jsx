/** @format */
/**
 * Home.jsx - Main dashboard page
 * Displays user portfolio when logged in, otherwise shows market overview
 */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync displayCoin with global coin data
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  // Demo portfolio data (only used when logged in)
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

  // Compute portfolio values (only when logged in)
  const currentValue = user 
    ? userPortfolio.reduce((sum, coin) => {
        const liveCoin = allCoin.find((c) => c.id === coin.id);
        if (!liveCoin) return sum;
        return sum + coin.amount * liveCoin.current_price;
      }, 0)
    : 0;

  const todayChange = user
    ? userPortfolio.reduce((sum, coin) => {
        const liveCoin = allCoin.find((c) => c.id === coin.id);
        if (!liveCoin) return sum;
        const coinValue = coin.amount * liveCoin.current_price;
        const change = coinValue * (liveCoin.price_change_percentage_24h / 100);
        return sum + change;
      }, 0)
    : 0;

  const profitLoss = currentValue - totalInvested;
  const gainPercent = (profitLoss / totalInvested) * 100;

  // Filter portfolio coins
  const portfolioCoins = user
    ? userPortfolio
        .map((portfolioCoins) => allCoin.find((c) => c.id === portfolioCoins.id))
        .filter(Boolean)
    : allCoin.slice(0, 5); // Show top 5 coins when not logged in

  // Chart state
  const [chartData, setChartData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  // Fetch price chart data
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-full font-primary font-semibold ">
      <div className="w-full flex flex-col h-screen md:px-1 py-5 gap-10">
        {/* Conditional Welcome Message */}
        {user ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 px-2 py-2">
              <h1 className="text-2xl">
                Welcome back, <span className="font-tertiary">{user.displayName || 'User'}</span>
              </h1>
              <p className="text-base font-secondary">
                Here's how your crypto is doing today
              </p>
            </div>
            
            {/* Portfolio Summary Cards - Only shown when logged in */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex flex-col border-1 border-gray-300 rounded-md px-5 py-3">
                <p className="text-sm text-[hsl(60,1%,52%)] mb-1">Total Invested</p>
                <span className="font-extrabold text-base">
                  {currency.symbol}
                  {totalInvested.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <small className="text-xs">Across all assets</small>
              </div>
              <div className="flex flex-col border-1 border-gray-300 rounded-md px-5 py-3">
                <p className="text-sm text-[hsl(60,1%,52%)] mb-1">Current Value</p>
                <span className="font-extrabold text-base">
                  {currency.symbol}
                  {currentValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <p className="text-xs" style={{ color: gainPercent >= 0 ? "green" : "red" }}>
                  {gainPercent >= 0 ? "+" : ""}
                  {gainPercent.toFixed(2)}%
                </p>
                <small>All-time portfolio gain</small>
              </div>
              <div className="flex flex-col border-1 border-gray-300 rounded-md px-5 py-3">
                <p className="text-sm text-[hsl(60,1%,52%)] mb-1">Today's Profit/Loss</p>
                <span className="font-extrabold text-base">
                  {currency.symbol}
                  {todayChange.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <p className="text-xs" style={{ color: todayChange >= 0 ? "green" : "red" }}>
                  {todayChange >= 0 ? "+" : ""}
                  {((todayChange / totalInvested) * 100).toFixed(2)}%
                </p>
                <small>Since last 24 hours</small>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 px-2 py-2">
              <h1 className="text-2xl">Market Overview</h1>
              <p className="text-base font-secondary">
                Track the latest cryptocurrency prices
              </p>
            </div>
          </div>
        )}

        {/* Price chart section (visible to all users) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] px-1 gap-3">
          <div className="chart rounded-md border-1 border-gray-300">
            <div className="bg-white chart rounded-md border-1 border-gray-300 p-3">
              <div className="flex justify-between">
                <h3 className="text-xs md:text-sm font-bold mb-2">
                  {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Price (24h)
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

          {/* Quick Stats - Shows portfolio when logged in, top coins when not */}
          <div className="flex flex-col border border-gray-300 rounded-md">
            <h2 className="text-sm font-semibold md:text-base py-2 md:py-5 px-1 md:px-3 font-primary md:font-normal">
              {user ? 'Your Portfolio' : 'Top Cryptocurrencies'}
            </h2>

            {portfolioCoins.map((coin) => (
              <div key={coin.id} className="flex items-center border-b border-gray-300 px-1 md:px-2">
                <div className="w-full flex items-center justify-between md:grid md:grid-cols-[40px_3fr_2fr] md:gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;