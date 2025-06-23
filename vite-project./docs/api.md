# CoinGecko API Integration

## Endpoint

GET https://api.coingecko.com/api/v3/coins/markets

## Query Parameters

| Parameter      | Description                              | Example            |
| -------------- | -------------------------------------- | ------------------ |
| `vs_currency`  | Currency to show prices in (usd, gbp, eur) | `usd`              |
| `order`        | Order of results                       | `market_cap_desc`   |
| `per_page`     | Number of results per page             | `100`              |
| `page`         | Page number                           | `1`                |
| `sparkline`    | Include sparkline data (true/false)  | `false`            |

## Authentication

- The API key is stored in an environment variable: `VITE_COINGECKO_API_KEY`.
- Passed as header `x-cg-demo-api-key` in requests.

## Sample Request Example

```javascript
fetch(
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
  {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
    },
  }
);


### Sample Response (trimmed)
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    "current_price": 45000,
    "market_cap": 850000000000,
    "market_cap_rank": 1,
    "price_change_percentage_24h": 2.34
  }
]

Notes:

> Data refreshes on currency change.
> Rate limits apply — avoid excessive polling.