/** @format */
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CoinContextProvider from "./context/CoinContext.jsx";
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoritesProvider>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </FavoritesProvider>
  </StrictMode>
);