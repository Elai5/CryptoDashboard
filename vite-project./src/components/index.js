// In your terminal, run:
touch .env

// Add your API key (with VITE_ prefix) inside .env
.env
VITE_NAMEOFAPP_API_KEY=your_actual_key_here

// Access the key in your React code via:
const apiKey = import.meta.env.VITE_NAMEOFAPP_API_KEY;

// real app simulation
// In your React component or utility file
const myApiKey = import.meta.env.VITE_COINGECKO_API_KEY;

// Example fetch using that key
const fetchCoins = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
    {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": myApiKey,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};
