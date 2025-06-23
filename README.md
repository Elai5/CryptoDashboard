<!-- @format -->

# Crypto Dashboard

A responsive, real-time cryptocurrency dashboard built with **React 19+**, **Vite**, **Tailwind CSS**, and **Chart.js**. This application fetches live data from the CoinGecko API to display top crypto market trends, interactive charts, and a simplified user portfolio simulation.
## Demo

### 📊 Dashboard View

![Dashboard View](./src/assets/Homepage Dashboard.png)

### 📈 Market Page

![Market Page](./src/assets/MarketPage.png)

### 📱 Mobile View

![Mobile View](./src/assets/mobile.png)

---
## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Limitations & Future Work](#limitations--future-work)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This application simulates a logged-in user's crypto portfolio. It uses hardcoded mock data to demonstrate core features like portfolio performance, coin tracking, and real-time data updates.

- Displays a list of the top 10 coins by market cap.
- Allows users to search and filter coins.
- Renders price charts with auto-refresh capabilities.
- Built with performance and developer experience in mind.



## Features

- Live data updates from CoinGecko
- Currency switcher (USD, EUR, GBP)
- Mock portfolio with profit/loss tracking
- Responsive design for all screen sizes
- Reusable, modular component structure
- Lightweight and fast (built with Vite)

---

## Installation

### Prerequisites

- Node.js v16+
- npm or yarn
- A [CoinGecko API Key](https://docs.coingecko.com/reference/introduction)

### Clone and Run

```bash
git clone https://github.com/your-username/crypto-dashboard.git
cd crypto-dashboard
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following:

```env
VITE_COINGECKO_API_KEY=your_api_key_here
```

### Start the App

```bash
npm run dev
```

If you've never used Tailwind CSS before, follow the [official Tailwind + Vite installation guide](https://tailwindcss.com/docs/installation/using-vite).

---

## Folder Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Market.jsx
│   ├── Graph.jsx
│   └── QuickStats.jsx
│
├── context/
│   └── CoinContext.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   └── Market.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Documentation

Full documentation available in the [`docs/`](./docs/) folder:

- [API Reference](./docs/api.md)
- [Usage Guide](./docs/usage.md)
- [Architecture](./docs/architecture.md)

---

## Tech Stack

- **React 19+**
- **Vite** (for blazing fast development)
- **Tailwind CSS**
- **Chart.js**
- **CoinGecko API**

---

## Limitations & Future Work

### Limitations

- Portfolio and watchlist data is currently hardcoded.
- No user authentication.
- Limited to 10 coins.

### Planned Improvements

- Add user authentication (Firebase or Auth0)
- Enable real-time watchlist management
- Expand API integration for broader historical data
- Improve responsiveness and accessibility

---

## Contributing

We welcome contributions. If you'd like to make changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Submit a PR for review

Avoid working directly on `main` — we encourage development via pull requests.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
