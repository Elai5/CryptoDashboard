# 💰 CryptoDashboard

A modern and responsive cryptocurrency dashboard built with **React** and **Tailwind CSS**.  
It provides real-time market data, portfolio summary, and investment insights in a sleek interface.

---

## 📌 Overview

Bitflow is a frontend cryptocurrency dashboard that **assumes a user is logged in** and displays:

- ✅ User's **name** and **avatar**
- 📊 A summary card showing:
  - **Total Investment** (hardcoded for now using JavaScript)
  - **Current Value** (based on live market data)
  - **Profit/Loss** (auto-calculated from the total investment and current value)

> ⚠️ Note: The total investment amount is **not real** — it's a placeholder value used to demonstrate functionality. However, **current prices and profit/loss calculations are dynamic and accurate** based on live data.

---

## 🔧 Features

- 👤 Assumes logged-in user with mock name and avatar
- 📈 Real-time prices from CoinGecko API
- 💹 Auto-calculated profit/loss based on fake investment
- 📱 Fully responsive layout with Tailwind CSS
- 📉 Live charts that **update every X seconds** and on page **refresh**
- 🔧 Components set up for scalability

---

## 🚧 Features in Progress

- 🔍 **Search functionality** (currently not working)
- 🧮 **User-inputted investment tracking** (future feature)
- 📄 Expansion to other pages (currently only Dashboard is functional)
- 🔁 Set dynamic refresh interval for price and chart updates

---

## 🛠 Tech Stack

- **React** – Frontend framework
- **Tailwind CSS** – Utility-first CSS for styling
- **CoinGecko API** – For fetching real-time cryptocurrency data
- **Chart.js or Recharts** – For price graph visualizations

---

## 🧪 How it Works

- `totalInvestment`: Declared using plain JavaScript for demo purposes.
- `currentValue`: Pulled from CoinGecko based on selected cryptocurrencies.
- `profit`: Calculated as `currentValue - totalInvestment`.
- Data updates:
  - On every page **refresh**
  - (Planned) Automatically every few seconds

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/cryptodash.git
cd viteproject
npm install
npm run dev
