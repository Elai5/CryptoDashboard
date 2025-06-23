# Usage Guide

## Getting Started

This application is a React-based cryptocurrency dashboard that displays a user's portfolio, live market data, and price trends.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16+ recommended)
- **npm** or **yarn**
- A valid **CoinGecko API key**

> 💡 You’ll need to register for a free CoinGecko API key via their official docs:  
> [https://docs.coingecko.com/reference/introduction](https://docs.coingecko.com/reference/introduction)

> ⚠️ If you’ve never worked with Tailwind CSS before, follow the official Vite + Tailwind setup guide here:  
> [https://tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)

---

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Elai5/CryptoDashboard.git
   cd vite-project
````

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root with the following:

   ```
   VITE_COINGECKO_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual CoinGecko API key.

---

## Running the App Locally

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open your browser and navigate to `http://localhost:3000` (or the port specified by your setup).

---

## How to Use the App

### Dashboard (Home Page)

* View the logged-in user's profile with avatar, name, and portfolio summary.
* See the initial investment, current portfolio value, and profit/loss (all hardcoded).
* Watch the quick stats section that shows trends of watchlisted coins.
* Interact with the graph displaying price trends of selected coins.

### Market Page

* Access the market page from the sidebar.
* Browse the top 10 cryptocurrencies with their current prices, market caps, and 24-hour changes.
* Use the currency selector in the navbar to switch between USD, GBP, and EUR. All prices update accordingly.

### Search & Filtering

* Use the search input in the navbar to filter coins by name in real time.

### Chart Updates

* The price trend graph automatically refreshes every 60 seconds or on page reload.
* The chart reflects changes based on selected coin and currency.

---

## Deployment

The app is deployed on **Netlify**. To deploy your own version:

1. Push your code to a GitHub repository.

2. Connect your GitHub repo to Netlify.

3. Set environment variables on Netlify with your API key.

4. Configure the build command as:

   ```
   npm run build
   ```

5. Set the publish directory to:

   ```
   dist
   ```

---

## Troubleshooting

* **API errors:** Check that your API key is valid and correctly set in environment variables.
* **Data not loading:** Ensure you have internet connectivity and the CoinGecko API is reachable.
* **Styling issues:** Confirm Tailwind CSS is properly installed and the build process completed without errors.

---

## Future Improvements

* Enable user authentication and dynamic portfolio management.
* Add real watchlist functionality with add/remove options.
* Implement error handling and loading states for API calls.
* Write unit and integration tests.
* Improve chart interactivity and customization options.

---

## Additional Resources

* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation)
* [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

---

## Customizing or Contributing
Feel free to explore the codebase and customize it to fit your needs.

✅ If you'd like to contribute to this project:

1. Fork the repository.

* Create a new branch for your feature or fix:

```git checkout -b feature/your-feature-name```
* Make your changes.
* Commit with a clear message:

```git commit -m "feat: add XYZ to enhance dashboard"```

* Push your changes and open a Pull Request (PR) to the main repository for review.

🚫 Please do not make changes directly on the main branch.

### Thanks for stopping by and happy coding!