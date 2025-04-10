# Lens Auth Server

## Getting started

Optional: generate a signer private key and api secret

```bash
bun run keygen
```

```bash
cp .env.example .env
```

Then, fill out the details in the `.env` file:

```bash
PRIVATE_KEY=INSERT_PRIVATE_KEY
APP=INSERT_APP
ENVIRONMENT=MAINNET|TESTNET
API_SECRET=INSERT_API_SECRET
```

The `API_SECRET` is shared between you and the Lens API, to make sure that only authorized requests can use the endpoints.

## Running

To start the server, run:

```bash
npm start
```

The server will start on `http://localhost:3004` unless a different port is specified via the `PORT` environment variable.

## API Documentation

This documentation provides examples for interacting with the API using `curl`.

## Authorize Endpoint

URL: `POST /<YOUR_SHARED_SECRET>/authorize`

**Request:**

```bash
curl -X POST http://localhost:3004/<YOUR_API_SECRET>/authorize \
     -H "Content-Type: application/json" \
     -d '{
      "account": "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
      "signedBy": "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
    }'
```

**Response:**

```json
{
  "allowed": true,
  "sponsored": false,
  "appVerificationEndpoint": "http://localhost:3004/<YOUR_API_SECRET>/verify"
}
```

Note that the response is hard-coded with `"sponsored": true` 

## Verification Endpoint

URL: `POST /:YOUR_API_SECRET/verify`

This endpoint is used to sign operation verification requests from the Lens API.

**Request:**

```bash
curl -X POST http://localhost:3004/<YOUR_API_SECRET>/verify \
     -H "Content-Type: application/json" \
     -d '{
       "nonce": "42",
       "deadline": "1630000000",
       "operation": "Post",
       "validator": "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
       "account": "0x4F10f685B6BF165e86f41CDf4a906B17F295C235"
     }'
```

**Response:**

```json
{
  "allowed": true,
  "signature": "0x0e50ac31b7f12aaa50a599bd1dfa5629352cdaf71600bf53dff788c56db398f133fa20efd732980fdb855c300d2052884d30fa6bc149e93f302391b0914069b31b"
}
```
