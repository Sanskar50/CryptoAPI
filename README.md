# Crypto API

Welcome to the Crypto API! This API provides access to Ethereum transaction data and price updates. Below is a guide to help you navigate the API endpoints and set up the price updater scheduler.

## Endpoints

### 1. Get Transactions and Ethereum Price

**Endpoint:** `/transaction/?address=SAMPLE_ADDRESS`

This endpoint returns a list of transactions for the specified Ethereum address along with the current Ethereum price.

### 2. Get Total Expenses and Ethereum Price

**Endpoint:** `/totalExpense/?address=SAMPLE_ADDRESS`

This endpoint returns the total expenses for the specified Ethereum address along with the current Ethereum price.

## Scheduler Setup

To keep the Ethereum price updated in the database every 10 minutes, you need to run the following command on a separate server:

```bash
node priceUpdater.js
