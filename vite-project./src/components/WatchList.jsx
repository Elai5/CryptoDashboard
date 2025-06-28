/** @format */
/**
 * WatchList.jsx - Shows user's favorited coins
 * Updated to use shared FavoritesContext
 */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const { user, favorites, toggleFavorite, isFavorite, loading } = useFavorites();
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const navigate = useNavigate();

  // Filter coins based on favorites from the shared context
  useEffect(() => {
    if (allCoin.length > 0 && favorites.length > 0) {
      const filteredCoins = allCoin.filter(coin => favorites.includes(coin.id));
      setFavoriteCoins(filteredCoins);
    } else {
      setFavoriteCoins([]);
    }
  }, [allCoin, favorites]);

  // Toggle favorite function - now uses the shared context
  const handleToggleFavorite = (coinId, e) => {
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }

    toggleFavorite(coinId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="font-primary bg-gray-900 min-h-screen w-full">
        <div className="w-full flex flex-col items-center justify-center h-screen gap-6 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">WatchList</h1>
            <p className="text-gray-300 mb-6">
              Please login to create and manage your cryptocurrency watchlist
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Login to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-primary bg-gray-900 min-h-screen w-full">
      <div className="w-full flex flex-col gap-6 p-4">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">
            Your WatchList
          </h1>
          <p className="text-gray-300">
            Track your favorite cryptocurrencies ({favorites.length} favorites)
          </p>
        </div>

        {/* Watchlist Content */}
        {favoriteCoins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="text-6xl text-gray-600 mb-4">⭐</div>
            <h2 className="text-xl font-semibold text-white">No favorites yet</h2>
            <p className="text-gray-400 text-center max-w-md">
              Start building your watchlist by clicking the star icon on any cryptocurrency in the market overview
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Browse Cryptocurrencies
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 bg-gray-750">
                <div className="col-span-1 text-sm font-semibold text-gray-400">#</div>
                <div className="col-span-3 text-sm font-semibold text-gray-400">Coin</div>
                <div className="col-span-2 text-sm font-semibold text-gray-400 text-right">Price</div>
                <div className="col-span-2 text-sm font-semibold text-gray-400 text-right">24h %</div>
                <div className="col-span-3 text-sm font-semibold text-gray-400 text-right">Market Cap</div>
                <div className="col-span-1 text-sm font-semibold text-gray-400 text-center">Action</div>
              </div>
              
              {favoriteCoins.map((coin, index) => (
                <div 
                  key={coin.id} 
                  className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                  onClick={() => navigate(`/coin/${coin.id}`)}
                >
                  <div className="col-span-1 text-white text-sm">
                    {coin.market_cap_rank || index + 1}
                  </div>
                  
                  <div className="col-span-3 flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div>
                      <p className="text-white font-semibold">{coin.name}</p>
                      <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <p className="text-white font-semibold">
                      {currency.symbol}
                      {coin.current_price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <span
                      className="font-semibold"
                      style={{
                        color: coin.price_change_percentage_24h >= 0 ? "#10B981" : "#EF4444",
                      }}
                    >
                      {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                  
                  <div className="col-span-3 text-right">
                    <p className="text-white">
                      {currency.symbol}
                      {coin.market_cap.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={(e) => handleToggleFavorite(coin.id, e)}
                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                      title="Remove from watchlist"
                    >
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {favoriteCoins.map((coin, index) => (
                <div 
                  key={coin.id}
                  className="bg-gray-800 rounded-lg border border-gray-700 p-4 cursor-pointer hover:bg-gray-750 transition-colors"
                  onClick={() => navigate(`/coin/${coin.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                      <div>
                        <p className="text-white font-semibold">{coin.name}</p>
                        <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => handleToggleFavorite(coin.id, e)}
                      className="p-2 hover:bg-gray-600 rounded transition-colors"
                      title="Remove from watchlist"
                    >
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs">Price</p>
                      <p className="text-white font-semibold">
                        {currency.symbol}
                        {coin.current_price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-xs">24h Change</p>
                      <span
                        className="font-semibold"
                        style={{
                          color: coin.price_change_percentage_24h >= 0 ? "#10B981" : "#EF4444",
                        }}
                      >
                        {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;