/** @format */
/**
 * Home.jsx - Main dashboard page
 * Updated to use shared FavoritesContext
 */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
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
  const { user, favorites, toggleFavorite, isFavorite, loading: favoritesLoading } = useFavorites();
  const [displayCoin, setDisplayCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Set loading state based on favorites loading
  useEffect(() => {
    setLoading(favoritesLoading);
  }, [favoritesLoading]);

  // Sync displayCoin with global coin data
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  // Enhanced favorite functionality with navigation for non-authenticated users
  const handleToggleFavorite = (coinId, e) => {
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }

    toggleFavorite(coinId);
  };

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

  // Filter portfolio coins - show 50 coins when not logged in
  const portfolioCoins = user
    ? userPortfolio
        .map((portfolioCoins) => allCoin.find((c) => c.id === portfolioCoins.id))
        .filter(Boolean)
    : allCoin.slice(0, 50);

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
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="font-primary font-semibold bg-gray-900 min-h-screen w-full pt-4">
      <div className="w-full flex flex-col h-full gap-10 p-0">
        {/* Conditional Welcome Message */}
        {user ? (
          <div className="flex flex-col gap-5 px-0">
            <div className="flex flex-col gap-1 px-4 py-2">
              <h1 className="text-2xl text-white">
                Welcome back, <span className="font-tertiary">{user.displayName || 'User'}</span>
              </h1>
              <p className="text-base text-gray-300">
                Here's how your crypto is doing today
              </p>
            </div>
            
            {/* Portfolio Summary Cards - Only shown when logged in */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 px-4">
              <div className="flex flex-col border border-gray-700 rounded-md px-5 py-3 bg-gray-800">
                <p className="text-sm text-gray-400 mb-1">Total Invested</p>
                <span className="font-extrabold text-base text-white">
                  {currency.symbol}
                  {totalInvested.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <small className="text-xs text-gray-400">Across all assets</small>
              </div>
              <div className="flex flex-col border border-gray-700 rounded-md px-5 py-3 bg-gray-800">
                <p className="text-sm text-gray-400 mb-1">Current Value</p>
                <span className="font-extrabold text-base text-white">
                  {currency.symbol}
                  {currentValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <p className="text-xs" style={{ color: gainPercent >= 0 ? "green" : "red" }}>
                  {gainPercent >= 0 ? "+" : ""}
                  {gainPercent.toFixed(2)}%
                </p>
                <small className="text-gray-400">All-time portfolio gain</small>
              </div>
              <div className="flex flex-col border border-gray-700 rounded-md px-5 py-3 bg-gray-800">
                <p className="text-sm text-gray-400 mb-1">Today's Profit/Loss</p>
                <span className="font-extrabold text-base text-white">
                  {currency.symbol}
                  {todayChange.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <p className="text-xs" style={{ color: todayChange >= 0 ? "green" : "red" }}>
                  {todayChange >= 0 ? "+" : ""}
                  {((todayChange / totalInvested) * 100).toFixed(2)}%
                </p>
                <small className="text-gray-400">Since last 24 hours</small>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-4">
            <div className="flex flex-col gap-1 py-2">
              <h1 className="text-2xl text-white">Market Overview</h1>
              <p className="text-base text-gray-300">
                Track the latest cryptocurrency prices
              </p>
            </div>
          </div>
        )}

        {/* Price chart section (visible to all users) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 px-0">
          <div className="chart rounded-none md:rounded-r-md border border-gray-700">
            <div className="bg-gray-800 chart rounded-none md:rounded-r-md border border-gray-700 p-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm md:text-base font-bold mb-2 text-white">
                  {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Price (24h)
                </h3>
                
                {/* Custom Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="mb-5 p-2 border border-gray-600 rounded outline-none bg-gray-700 text-white text-sm flex items-center gap-2 min-w-[200px] justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {allCoin.find(coin => coin.id === selectedCoin) && (
                        <img 
                          src={allCoin.find(coin => coin.id === selectedCoin).image} 
                          alt=""
                          className="w-5 h-5"
                        />
                      )}
                      <span className="truncate">
                        {allCoin.find(coin => coin.id === selectedCoin)?.name || selectedCoin} 
                        ({allCoin.find(coin => coin.id === selectedCoin)?.symbol.toUpperCase() || ''})
                      </span>
                    </div>
                    <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-gray-700 border border-gray-600 rounded mt-1 max-h-60 overflow-y-auto z-50 shadow-lg">
                      {allCoin.slice(0, 50).map((coin) => (
                        <div
                          key={coin.id}
                          onClick={() => {
                            setSelectedCoin(coin.id);
                            setDropdownOpen(false);
                          }}
                          className="flex items-center justify-between p-3 hover:bg-gray-600 cursor-pointer border-b border-gray-600 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                            <div>
                              <div className="text-white text-sm">{coin.name}</div>
                              <div className="text-gray-400 text-xs uppercase">{coin.symbol}</div>
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => handleToggleFavorite(coin.id, e)}
                            className="p-1 hover:bg-gray-500 rounded transition-colors flex-shrink-0"
                            title={user ? (isFavorite(coin.id) ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"}
                          >
                            {isFavorite(coin.id) ? (
                              <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                              </svg>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="time"
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                  />
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
          <div className="flex flex-col border border-gray-700 rounded-none md:rounded-l-md bg-gray-800 overflow-y-auto max-h-[400px]">
            <h2 className="text-sm font-semibold md:text-base py-3 px-4 text-white sticky top-0 bg-gray-800 border-b border-gray-700">
              {user ? 'Your Portfolio' : 'Top Cryptocurrencies'}
            </h2>

            <div className="overflow-y-auto">
              {portfolioCoins.map((coin) => (
                <div key={coin.id} className="flex items-center border-b border-gray-700 px-4 hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => navigate(`/coin/${coin.id}`)}>
                  <div className="w-full flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                      <div>
                        <p className="text-sm text-white">{coin.name}</p>
                        <span className="text-xs uppercase text-gray-400">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">
                          {currency.symbol}
                          {coin.current_price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <span
                          className="text-xs"
                          style={{
                            color:
                              coin.price_change_percentage_24h >= 0
                                ? "#10B981" // green-500
                                : "#EF4444", // red-500
                          }}
                        >
                          {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => handleToggleFavorite(coin.id, e)}
                        className="p-1 hover:bg-gray-600 rounded transition-colors flex-shrink-0"
                        title={user ? (isFavorite(coin.id) ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"}
                      >
                        {isFavorite(coin.id) ? (
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;