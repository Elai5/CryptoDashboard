
# Project Architecture

## Overview

This app simulates a logged-in user experience with demo data. The user (e.g., "John") is represented with an avatar, name, and picture, all hardcoded for demonstration.

* The portfolio is a static dataset initialized in JavaScript with predefined coin holdings and their initial prices.
* Based on this demo portfolio, the app calculates:

  * Profit and loss for each coin
  * How coins are performing in the market in real-time (using live API data)
* The **Quick Start** section shows a hardcoded watchlist of three coins for easy tracking of price trends.
* The **Chat Bar** (chat.js) displays live performance updates of selected coins, refreshing every minute or on page reload.
* Navigation is handled by a sidebar with links to different app pages.
* The **Markets** page displays the top 10 cryptocurrencies by market cap with live data fetched from the CoinGecko API.

---

## Key Components

* **Navbar.jsx**

  * Displays the hardcoded user info: avatar, name, and picture.
  * Includes search and currency selector (currency changes update the market data).
* **Market.jsx**

  * Displays the top 10 cryptocurrencies by market cap.
  * Uses live data from the CoinContext to show price, market cap, and 24h change.
* **Sidebar.jsx**

  * Navigation links to Home, Market, and other pages.
* **Chat.js**

  * Shows coin performance updates in a chat-like UI.
  * Data refreshes automatically every minute or on reload.
* **QuickStart.jsx** (or equivalent)

  * Displays a fixed watchlist of three coins for quick tracking.
* **CoinContext.jsx**

  * Manages global state for live coin data and currency selection.
  * Fetches live market data from the CoinGecko API on currency change.
* **App.jsx**

  * Sets up layout and routing (Navbar + Sidebar + main content).

---

## Data Flow

1. On load, hardcoded user data and demo portfolio are initialized.
2. CoinContext fetches live coin market data from CoinGecko API based on selected currency.
3. Portfolio values and profit/loss are calculated using live price data combined with hardcoded initial prices.
4. Quick Start and Chat Bar update coin info from live data.
5. Users navigate pages via Sidebar; Market page shows top 10 coins.

---

## API Integration

* CoinGecko API is used for live coin market data.
* API calls are authenticated using a key stored in environment variables.
* Key endpoints include:

  * `/coins/markets` for current coin data.
  * `/coins/{id}/market_chart` for historical price data (used by graph components).

---

## Summary

This architecture balances hardcoded demo user data and portfolio with live API data to provide a realistic, interactive crypto dashboard experience. The app mimics logged-in user functionality while allowing live tracking of market trends, profit/loss, and coin performance.

---

