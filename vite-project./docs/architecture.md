# Project Architecture

## Overview

This application is a cryptocurrency dashboard that mimics a logged-in user named **John**. It displays his (hard-coded) portfolio, profit/loss analysis, and how his selected coins are performing in real-time.

The app integrates with the CoinGecko API to pull live market data, and uses **React**, **Tailwind CSS**, and **Chart.js** for the frontend and visualization.

---

## Key Components

### `Navbar.jsx`
- Shows the app logo, search input, currency selector, and user avatar.
- Handles coin filtering by name and changing selected currency.

### `Sidebar.jsx`
- Provides navigation links (e.g., Home, Market).

### `Home.jsx`
- Acts as the main dashboard.
- Displays:
  - User profile (name, avatar)
  - Portfolio overview (initial investment, current value, profit/loss)
  - Quick stats (watchlisted coins)
  - Dynamic chart showing price trends.

### `Market.jsx`
- Displays a table of the top 10 cryptocurrencies.
- Shows name, price, market cap, and 24h change.
- Updates dynamically with currency changes.

### `Chart.js`
- Renders a graph visualizing a selected coin’s price trends.
- Uses data from the CoinGecko market chart endpoint.
- Auto-refreshes every 60 seconds or on page reload.

---

## State Management

- **No global state library or Context API** used.
- State is handled locally within each component using `useState` and `useEffect`.
- Currency and search filters are passed down via props or lifted state.

---

## Data Flow

1. On app load, API requests fetch current market data.
2. Static data defines:
   - User portfolio (initial investment & coin holdings)
   - Watchlist (3 hard-coded coins)
3. User can:
   - Switch between USD, GBP, EUR
   - Search coins
4. Chart component fetches price data for selected coins.
5. Data auto-refreshes every minute or on currency switch.

---

## Routing

- Implemented using `react-router-dom`.
- Defined Routes:
  - `/` → Home (dashboard)
  - `/market` → Market page (top 10 coins)

---

## API Integration

- **Base Endpoint:** https://api.coingecko.com/api/v3/coins/markets


- **Market Chart Endpoint (for graph):**
https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency={currency}&days={days}


- **Authentication:**
- API key stored in `.env` as `VITE_COINGECKO_API_KEY`
- Passed as header: `x-cg-demo-api-key`

---

## Graph & Data Visualization

- Chart.js used to display price trends over time.
- The graph updates based on selected currency and coin.
- Refreshes every 1 minute to keep data current.

---

## Styling

- Tailwind CSS for modern and responsive UI.
- Reusable utility classes for spacing, layout, typography, and interactivity.

---

## Technology Summary

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **API:** CoinGecko
- **Charting:** Chart.js
- **Routing:** React Router
- **Deployment:** Netlify

---

## Limitations & Future Work

- User authentication is not implemented; data is mocked.
- Portfolio and watchlist are static.
- No persistent storage or backend.
- Future improvements:
- Enable user login & customizable portfolios
- Add real watchlist functionality
- Expand chart interactivity (e.g., range picker, zoom)
- Write automated tests for components and API logic

---

## Testing & Deployment

- Manual testing only (via browser).
- App deployed using **Netlify** for easy CI/CD on push.

---

## Folder Structure

```
/src
├── /components
│ ├── Navbar.jsx
│ ├── Sidebar.jsx
│ ├── Home.jsx
│ ├── Market.jsx
│ ├── Chart.js
├── /docs
│ ├── api.md
│ ├── usage.md
│ └── architecture.md
├── App.jsx
├── index.jsx
└── styles.css (or tailwind.config.js)
```
---

## Summary

This project is a simplified cryptocurrency dashboard built for learning and demonstration. It uses static user data with dynamic market info from CoinGecko and features real-time charting and responsive layout. The structure is modular and designed for future upgrades.
