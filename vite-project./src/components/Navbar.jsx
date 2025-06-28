/** @format */
/**
 * Optimized Navbar component with Firebase Authentication
 * 
 * Updates:
 * - Fixed watchlist functionality
 * - Proper favorites count display
 * - Consistent watchlist dropdown
 */

import React, { useContext, useEffect, useState, useCallback } from "react";
import { assets } from "../assets/assets";
import { 
  BiSearch, 
  BiX, 
  BiMenu, 
  BiStar, 
  BiUser, 
  BiLogOut, 
  BiCog
} from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { CoinContext } from "../context/CoinContext";
import { auth } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  // Context and navigation
  const { 
    setCurrency, 
    allCoin, 
    currency, 
    watchlist,
    addToWatchlist,
    removeFromWatchlist
  } = useContext(CoinContext);
  const navigate = useNavigate();

  // Authentication state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // UI state
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileStates, setMobileStates] = useState({
    searchOpen: false,
    menuOpen: false
  });
  const [dropdownStates, setDropdownStates] = useState({
    crypto: false,
    watchlist: false,
    user: false,
    notifications: false
  });

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Enhanced logout handler
  const handleLogout = useCallback(async () => {
    setLogoutLoading(true);
    try {
      await signOut(auth);
      setDropdownStates({
        crypto: false,
        watchlist: false,
        user: false,
        notifications: false
      });
      setMobileStates({
        searchOpen: false,
        menuOpen: false
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLogoutLoading(false);
    }
  }, [navigate]);

  // Navigation handlers
  const navigateTo = useCallback((path) => {
    navigate(path);
    setMobileStates(prev => ({ ...prev, menuOpen: false }));
  }, [navigate]);

  const handleProfile = useCallback(() => {
    setDropdownStates(prev => ({ ...prev, user: false }));
    navigate('/profile');
  }, [navigate]);

  const handleSettings = useCallback(() => {
    setDropdownStates(prev => ({ ...prev, user: false }));
    navigate('/settings');
  }, [navigate]);

  // Currency handler
  const handleCurrencyChange = useCallback((e) => {
    const currencyMap = {
      usd: { name: "usd", symbol: "$" },
      gbp: { name: "gbp", symbol: "£" },
      eur: { name: "eur", symbol: "€" }
    };
    setCurrency(currencyMap[e.target.value] || currencyMap.usd);
  }, [setCurrency]);

  // Search functionality
  const handleSearchInput = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (value.length > 0) {
      const filtered = allCoin.filter(coin => 
        coin.name.toLowerCase().includes(value.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [allCoin]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchInput.trim() && searchResults.length > 0) {
      navigate(`/coin/${searchResults[0].id}`);
      setSearchInput("");
      setSearchResults([]);
      setMobileStates(prev => ({ ...prev, searchOpen: false }));
    }
  }, [searchInput, searchResults, navigate]);

  const clearSearch = useCallback(() => {
    setSearchInput("");
    setSearchResults([]);
  }, []);

  // Mobile handlers
  const toggleMobileSearch = useCallback(() => {
    setMobileStates(prev => ({ 
      ...prev, 
      searchOpen: !prev.searchOpen,
      menuOpen: false
    }));
    clearSearch();
  }, [clearSearch]);

  const toggleMobileMenu = useCallback(() => {
    setMobileStates(prev => ({ 
      ...prev, 
      menuOpen: !prev.menuOpen,
      searchOpen: false
    }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileStates(prev => ({ 
      ...prev, 
      menuOpen: false
    }));
  }, []);

  // Dropdown handlers
  const toggleDropdown = useCallback((dropdown) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown],
      ...Object.fromEntries(
        Object.keys(prev)
          .filter(key => key !== dropdown)
          .map(key => [key, false])
      )
    }));
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container') && 
          !event.target.closest('.dropdown-trigger')) {
        setDropdownStates({
          crypto: false,
          watchlist: false,
          user: false,
          notifications: false
        });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Helper functions
  const getUserDisplayName = () => {
    if (!user) return "";
    return user.displayName || user.email?.split('@')[0] || "User";
  };

  // Check if coin is in watchlist
  const isInWatchlist = (coinId) => {
    return watchlist.some(item => item.id === coinId);
  };

  // Top 5 cryptocurrencies for dropdown
  const topCryptos = allCoin.slice(0, 5);

  return (
    <>
      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-gray-900 border-b border-gray-700 shadow-sm font-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left section - Logo and navigation */}
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div 
                className="flex items-center space-x-3 cursor-pointer" 
                onClick={() => navigate('/')}
              >
                <img
                  className="h-8 w-8 rounded-lg object-cover"
                  src={assets.logo4}
                  alt="BitFlow Logo"
                />
                <span className="hidden sm:block text-xl font-bold text-white">
                  BitFlow
                </span>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Cryptocurrencies dropdown */}
                <div className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown('crypto')}
                    className="dropdown-trigger flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                  >
                    <span>Cryptocurrencies</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownStates.crypto && (
                    <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg ring-1 ring-gray-700 py-1 z-10">
                      {topCryptos.map((crypto) => (
                        <button
                          key={crypto.id}
                          onClick={() => navigateTo(`/coin/${crypto.id}`)}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center space-x-3"
                        >
                          <img src={crypto.image} alt={crypto.name} className="h-5 w-5 rounded-full" />
                          <div>
                            <span className="font-medium">{crypto.name}</span>
                            <span className="ml-2 text-gray-400">{crypto.symbol.toUpperCase()}</span>
                          </div>
                        </button>
                      ))}
                      <div className="border-t border-gray-700"></div>
                      <button
                        onClick={() => navigateTo('/cryptocurrencies')}
                        className="w-full text-left block px-4 py-2 text-sm text-blue-400 hover:bg-gray-700"
                      >
                        View all cryptocurrencies →
                      </button>
                    </div>
                  )}
                </div>

                {/* Watchlist - only for authenticated users */}
                {user && (
                  <div className="relative dropdown-container">
                    <button
                      onClick={() => toggleDropdown('watchlist')}
                      className="dropdown-trigger flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                    >
                      <BiStar className="text-yellow-400" />
                      <span>Watchlist</span>
                      {watchlist > 0 && (
                        <span className="ml-1 bg-yellow-900 text-yellow-200 text-xs px-2 py-0.5 rounded-full">
                          {watchlist}
                        </span>
                      )}
                    </button>

                    {dropdownStates.watchlist && watchlist.length > 0 && (
                      <div className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg ring-1 ring-gray-700 py-1 z-10">
                        <div className="px-4 py-2 text-sm font-medium text-gray-200 border-b border-gray-700">
                          Your Watchlist
                        </div>
                        {watchlist.slice(0, 5).map((coin) => (
                          <button
                            key={coin.id}
                            onClick={() => navigateTo(`/coin/${coin.id}`)}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <img src={coin.image} alt={coin.name} className="h-5 w-5 rounded-full" />
                              <span>{coin.name}</span>
                            </div>
                            <span className="font-medium">
                              {currency.symbol}{coin.current_price?.toLocaleString()}
                            </span>
                          </button>
                        ))}
                        <div className="border-t border-gray-700"></div>
                        <button
                          onClick={() => navigateTo('/watchlist')}
                          className="w-full text-left block px-4 py-2 text-sm text-blue-400 hover:bg-gray-700"
                        >
                          View all watched coins →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Center section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search cryptocurrencies..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      <BiX className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {/* Search results dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                    {searchResults.map((coin) => (
                      <button
                        key={coin.id}
                        onClick={() => {
                          navigateTo(`/coin/${coin.id}`);
                          clearSearch();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-3 border-b border-gray-700 last:border-b-0"
                      >
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="h-6 w-6 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-sm text-white">{coin.name}</div>
                          <div className="text-xs text-gray-400">{coin.symbol?.toUpperCase()}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>

            {/* Right section - Auth and controls */}
            <div className="flex items-center space-x-4">
              {/* Mobile search toggle */}
              <button
                onClick={toggleMobileSearch}
                className="md:hidden p-2 text-gray-400 hover:text-gray-200 focus:outline-none"
                aria-label="Toggle search"
              >
                <BiSearch className="h-5 w-5" />
              </button>

              {/* Currency selector */}
              <select
                onChange={handleCurrencyChange}
                value={currency.name}
                className="text-sm border border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-gray-700 text-white"
              >
                <option value="usd">USD</option>
                <option value="gbp">GBP</option>
                <option value="eur">EUR</option>
              </select>

              {/* Notifications - only for authenticated users */}
              {user && (
                <div className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown('notifications')}
                    className="dropdown-trigger p-2 text-gray-400 hover:text-gray-200 focus:outline-none relative"
                  >
                    <FaBell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </button>

                  {dropdownStates.notifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg ring-1 ring-gray-700 py-1 z-10">
                      <div className="px-4 py-2 text-sm font-medium text-gray-200 border-b border-gray-700">
                        Notifications
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="px-4 py-3 text-sm text-gray-400 text-center">
                          No new notifications
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Auth section */}
              {authLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
              ) : user ? (
                /* User menu */
                <div className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown('user')}
                    className="dropdown-trigger flex items-center space-x-2 focus:outline-none"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User profile"
                        className="h-8 w-8 rounded-full object-cover border-2 border-gray-600"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium text-white">
                      {getUserDisplayName()}
                    </span>
                  </button>

                  {dropdownStates.user && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg ring-1 ring-gray-700 py-1 z-10">
                      <div className="px-4 py-2 text-sm text-gray-200 border-b border-gray-700">
                        <div className="font-medium">{getUserDisplayName()}</div>
                        <div className="text-xs text-gray-400 truncate">{user.email}</div>
                      </div>
                      
                      <button
                        onClick={handleProfile}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                      >
                        <BiUser className="mr-3 h-4 w-4" />
                        Profile
                      </button>
                      
                      <button
                        onClick={handleSettings}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                      >
                        <BiCog className="mr-3 h-4 w-4" />
                        Settings
                      </button>
                      
                      <div className="border-t border-gray-700"></div>
                      
                      <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 disabled:opacity-50"
                      >
                        {logoutLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing Out...
                          </>
                        ) : (
                          <>
                            <BiLogOut className="mr-3 h-4 w-4" />
                            Sign Out
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Auth buttons - hidden on mobile */
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white focus:outline-none"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-gray-400 hover:text-gray-200 focus:outline-none"
                aria-label="Toggle menu"
              >
                <BiMenu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {mobileStates.searchOpen && (
          <div className="md:hidden border-t border-gray-700 px-4 py-3 bg-gray-800">
            <form onSubmit={handleSearchSubmit} className="relative">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Search cryptocurrencies..."
                className="w-full pl-10 pr-10 py-2 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                autoFocus
              />
              <button
                type="button"
                onClick={toggleMobileSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                <BiX className="h-4 w-4" />
              </button>
            </form>
            
            {/* Mobile search results */}
            {searchResults.length > 0 && (
              <div className="mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {searchResults.map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => {
                      navigateTo(`/coin/${coin.id}`);
                      clearSearch();
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-3 border-b border-gray-700 last:border-b-0"
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-5 w-5 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-sm text-white">{coin.name}</div>
                      <div className="text-xs text-gray-400">{coin.symbol?.toUpperCase()}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {mobileStates.menuOpen && (
          <div className="md:hidden border-t border-gray-700 bg-gray-800">
            <div className="px-4 py-2 space-y-1">
              {/* Close button for mobile menu */}
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-700">
                <span className="text-sm font-medium text-gray-200">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-1 rounded-full hover:bg-gray-700 focus:outline-none"
                  aria-label="Close menu"
                >
                  <BiX className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Auth section for mobile */}
              {!user && (
                <div className="pb-2 mb-2 border-b border-gray-700">
                  <Link
                    to="/login"
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-200 hover:bg-gray-700"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-blue-400 hover:bg-gray-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Navigation links */}
              <button
                onClick={() => navigateTo('/cryptocurrencies')}
                className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-200 hover:bg-gray-700"
              >
                Cryptocurrencies
              </button>
              
              {user && (
                <button
                  onClick={() => navigateTo('/watchlist')}
                  className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-200 hover:bg-gray-700"
                >
                  Watchlist
                </button>
              )}
              
              <button
                onClick={() => navigateTo('/markets')}
                className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-200 hover:bg-gray-700"
              >
                Markets
              </button>

              {/* User section for mobile */}
              {user && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <button
                    onClick={handleProfile}
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-200 hover:bg-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleSettings}
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-200 hover:bg-gray-700"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center text-red-400 hover:bg-gray-700"
                  >
                    {logoutLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing Out...
                      </>
                    ) : (
                      "Sign Out"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;