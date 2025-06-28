/** @format */
/**
 * FavoritesContext.jsx - Shared context for managing user favorites
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        // In a real app, you would load favorites from your database here
        // For now, we'll start with an empty array or load from a temporary store
        loadUserFavorites(currentUser.uid);
      } else {
        setFavorites([]);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Load user favorites (in a real app, this would be from your database)
  const loadUserFavorites = async (userId) => {
    try {
      // Since localStorage isn't available, we'll use a simple in-memory store
      // In a real app, you'd make an API call to your backend here
      setFavorites([]);
    } catch (error) {
      console.error('Failed to load favorites:', error);
      setFavorites([]);
    }
  };

  // Save favorites (in a real app, this would save to your database)
  const saveFavorites = async (newFavorites) => {
    try {
      if (user) {
        // In a real app, you'd make an API call to save to your backend here
        // For now, we'll just update the state
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  // Add a coin to favorites
  const addToFavorites = (coinId) => {
    if (!user) return false;
    
    if (!favorites.includes(coinId)) {
      const newFavorites = [...favorites, coinId];
      saveFavorites(newFavorites);
      return true;
    }
    return false;
  };

  // Remove a coin from favorites
  const removeFromFavorites = (coinId) => {
    if (!user) return false;
    
    if (favorites.includes(coinId)) {
      const newFavorites = favorites.filter(id => id !== coinId);
      saveFavorites(newFavorites);
      return true;
    }
    return false;
  };

  // Toggle favorite status
  const toggleFavorite = (coinId) => {
    if (!user) return false;
    
    const newFavorites = favorites.includes(coinId)
      ? favorites.filter(id => id !== coinId)
      : [...favorites, coinId];
    
    saveFavorites(newFavorites);
    return true;
  };

  // Check if a coin is in favorites
  const isFavorite = (coinId) => {
    return favorites.includes(coinId);
  };

  const value = {
    user,
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};