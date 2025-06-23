# Project Architecture

### Key Components

- **Navbar.jsx**
  - Shows logo, search input, currency selector, and user avatar
  - Handles coin filtering by name and currency change

- **Market.jsx**
  - Displays a table of top 10 cryptocurrencies
  - Pulls data from CoinContext and formats price, market cap, and 24h change

- **Sidebar.jsx**
  - (Add your navigation links here)

- **CoinContext.jsx**
  - Global state for coin list and selected currency
  - Fetches data from CoinGecko API on currency change

- **App.jsx**
  - Sets up the main layout (Navbar + Sidebar + main content)
  - Configures routing with React Router

---

### Data Flow

1. User visits the app → `CoinContext` fetches crypto data based on currency.
2. User can:
   - Search coins from the navbar
   - View results in Market page
   - Switch currencies → updates all prices

