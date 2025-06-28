/** @format */
/**
 * Optimized Navbar component with Firebase Authentication
 * 
 * Updates:
 * - Removed dark/light mode toggle functionality
 * - Removed news and portfolio sections
 * - Added close button to mobile menu bar
 * - Simplified theme classes for light mode only
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
  BiWallet, 
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
    watchlist
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
      setDropdownStates(prev => ({
        ...prev,
        crypto: false,
        watchlist: false,
        user: false,
        notifications: false
      }));
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

  // Top 5 cryptocurrencies for dropdown
  const topCryptos = allCoin.slice(0, 5);

  return (
    <>
      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b shadow-sm font-primary bg-gray-900 text-white border-gray-200">
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
                <span className="hidden sm:block text-xl font-bold">
                  BitFlow
                </span>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Cryptocurrencies dropdown */}
                <div className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown('crypto')}
                    className="dropdown-trigger flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-600"
                  >
                    <span>Cryptocurrencies</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownStates.crypto && (
                    <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg ring-1 py-1 z-10 bg-white border-gray-200">
                      {topCryptos.map((crypto) => (
                        <button
                          key={crypto.id}
                          onClick={() => navigateTo(`/coin/${crypto.id}`)}
                          className="w-full text-left block px-4 py-2 text-sm flex items-center space-x-3 text-gray-700 hover:bg-gray-100"
                        >
                          <img src={crypto.image} alt={crypto.name} className="h-5 w-5 rounded-full" />
                          <div>
                            <span className="font-medium">{crypto.name}</span>
                            <span className="ml-2 text-gray-500">
                              {crypto.symbol.toUpperCase()}
                            </span>
                          </div>
                        </button>
                      ))}
                      <div className="border-gray-200"></div>
                      <button
                        onClick={() => navigateTo('/cryptocurrencies')}
                        className="w-full text-left block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
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
                      className="dropdown-trigger flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-600"
                    >
                      <BiStar className="text-yellow-500" />
                      <span>Watchlist</span>
                      {watchlist > 0 && (
                        <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                          {watchlist}
                        </span>
                      )}
                    </button>

                    {dropdownStates.watchlist && watchlist.length > 0 && (
                      <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg ring-1 py-1 z-10 bg-white border-gray-200">
                        <div className="px-4 py-2 text-sm font-medium border-b text-white border-gray-200">
                          Your Watchlist
                        </div>
                        {watchlist.slice(0, 5).map((coin) => (
                          <button
                            key={coin.id}
                            onClick={() => navigateTo(`/coin/${coin.id}`)}
                            className="w-full text-left block px-4 py-2 text-sm flex items-center justify-between text-gray-700 hover:bg-gray-100"
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
                        <div className="border-gray-200"></div>
                        <Link
                          onClick={() => navigateTo('/watchlist')}
                          className="w-full text-left block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                        >
                          Manage watchlist →
                        </Link>
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
                  <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search cryptocurrencies..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent border-gray-300 text-white"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-600"
                    >
                      <BiX className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {/* Search results dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 bg-white border-gray-200">
                    {searchResults.map((coin) => (
                      <button
                        key={coin.id}
                        onClick={() => {
                          navigateTo(`/coin/${coin.id}`);
                          clearSearch();
                        }}
                        className="w-full px-4 py-2 text-left flex items-center space-x-3 border-b last:border-b-0 hover:bg-gray-100 border-gray-200"
                      >
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="h-6 w-6 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-sm text-gray-700">
                            {coin.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {coin.symbol?.toUpperCase()}
                          </div>
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
                className="md:hidden p-2 rounded-full focus:outline-none"
                aria-label="Toggle search"
              >
                <BiSearch className="h-5 w-5 text-gray-500" />
              </button>

              {/* Currency selector */}
              <select
                onChange={handleCurrencyChange}
                value={currency.name}
                className="text-sm border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer border-gray-300 text-white"
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
                    className="dropdown-trigger p-2 rounded-full focus:outline-none relative"
                  >
                    <FaBell className="h-4 w-4 text-gray-500" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </button>

                  {dropdownStates.notifications && (
                    <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg ring-1 py-1 z-10 bg-white border-gray-200">
                      <div className="px-4 py-2 text-sm font-medium border-b text-gray-700 border-gray-200">
                        Notifications
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="px-4 py-3 text-sm text-center text-white">
                          No new notifications
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Auth section */}
              {authLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
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
                        className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 hover:border-gray-300"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium bg-blue-500">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium">
                      {getUserDisplayName()}
                    </span>
                  </button>

                  {dropdownStates.user && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 py-1 z-10 bg-white border-gray-200">
                      <div className="px-4 py-2 text-sm border-b text-gray-700 border-gray-200">
                        <div className="font-medium">{getUserDisplayName()}</div>
                        <div className="text-xs truncate text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      
                      <button
                        onClick={handleProfile}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <BiUser className="mr-3 h-4 w-4" />
                        Profile
                      </button>
                      
                      <button
                        onClick={handleSettings}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <BiCog className="mr-3 h-4 w-4" />
                        Settings
                      </button>
                      
                      <div className="border-gray-200"></div>
                      
                      <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        {logoutLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                    className="px-4 py-2 text-sm font-medium focus:outline-none text-gray-700 hover:text-gray-900"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full focus:outline-none"
                aria-label="Toggle menu"
              >
                <BiMenu className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {mobileStates.searchOpen && (
          <div className="md:hidden border-t px-4 py-3 border-gray-200 bg-gray-50">
            <form onSubmit={handleSearchSubmit} className="relative">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Search cryptocurrencies..."
                className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-900"
                autoFocus
              />
              <button
                type="button"
                onClick={toggleMobileSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <BiX className="h-4 w-4" />
              </button>
            </form>
            
            {/* Mobile search results */}
            {searchResults.length > 0 && (
              <div className="mt-2 border rounded-lg shadow-lg max-h-48 overflow-y-auto bg-white border-gray-200">
                {searchResults.map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => {
                      navigateTo(`/coin/${coin.id}`);
                      clearSearch();
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-3 border-b last:border-b-0 hover:bg-gray-100 border-gray-200"
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-5 w-5 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-sm text-gray-700">
                        {coin.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {coin.symbol?.toUpperCase()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {mobileStates.menuOpen && (
          <div className="md:hidden border-t bg-white border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {/* Close button for mobile menu */}
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-label="Close menu"
                >
                  <BiX className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Auth section for mobile */}
              {!user && (
                <div className="pb-2 mb-2 border-gray-200">
                  <Link
                    to="/login"
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-blue-600 hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Navigation links */}
              <button
                onClick={() => navigateTo('/cryptocurrencies')}
                className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cryptocurrencies
              </button>
              
              {user && (
                <button
                  onClick={() => navigateTo('/watchlist')}
                  className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Watchlist
                </button>
              )}
              
              <button
                onClick={() => navigateTo('/markets')}
                className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                Markets
              </button>

              {/* User section for mobile */}
              {user && (
                <div className="mt-2 pt-2 border-gray-200">
                  <button
                    onClick={handleProfile}
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleSettings}
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    className="w-full text-left block px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center text-red-600 hover:bg-gray-100"
                  >
                    {logoutLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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