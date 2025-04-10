# Lens Authentication Workflow Example App

This code provides examples of how to set up your backend authorization app workflow. Note that you need to add your own logic to this repository; it is not a simple fork-and-run solution unless you intend to authorize and sponsor everyone.

## Setup repo

The API requires a `.env` file that contains the private key. If you are using Vercel, you can store your private key in the Vercel environment variables. For a more secure approach, consider using key management services like AWS Secrets Manager. However, for this example, we are keeping it simple.

```bash
cp .env.example .env
```

Then, fill out the details in the `.env` file:

```bash
PRIVATE_KEY=INSERT_PRIVATE_KEY
APP=INSERT_APP
ENVIRONMENT=MAINNET|TESTNET
SHARED_SECRET=INSERT_SECRET
```

The `SHARED_SECRET` is required for the verification operation to ensure that only authorized requests can use the signed sources.

## Running

To start the application, simply run:

```bash
npm start
```

The application will start on `http://localhost:3003` unless a different port is specified via the `PORT` environment variable.

## API Documentation

This documentation provides examples for interacting with the API using `curl`.

## Authorize Endpoint

URL: `POST /<YOUR_SHARED_SECRET>/authorize`

**Request:**

```bash
curl -X POST http://localhost:3003/<YOUR_SHARED_SECRET>/authorize \
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
  "appVerificationEndpoint": "http://localhost:3003/<YOUR_SHARED_SECRET>/verify-operation"
}
```

Note that the response is hard-coded with `"sponsored": false` to prevent any funds from being spent without you adding your own custom logic. By default, the application does not sponsor.

## Verification Endpoint

URL: `POST /:YOUR_SHARED_SECRET/verify-operation`

This endpoint is used to sign operation verification requests from the Lens API.

**Request:**

```bash
curl -X POST http://localhost:3003/<YOUR_SHARED_SECRET>/verify-operation \
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
