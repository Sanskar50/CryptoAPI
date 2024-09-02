const cron = require('node-cron');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Crypto = require('./schemas/transactions');

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Function to fetch Ethereum price and update the database
async function updateEthereumPrice() {
    try {
        const ethPriceApiRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)

        const ethPrice = ethPriceApiRes.data;
        
        // Update all documents in the database with the new price
        const result = await Crypto.updateMany(
            {}, // empty filter to match all documents
            { $set: { ethereum_price: ethPrice.ethereum.inr } }
        );

        console.log(`Ethereum price updated to ${ethPrice.ethereum.inr}`);

    } catch (error) {
        console.error('Error updating Ethereum price:', error.message);
    }
}

// Schedule the task to run every 10 minutes
cron.schedule('*/1 * * * *', () => {
    console.log('Running Ethereum price update task...');
    updateEthereumPrice();
});

console.log('Ethereum price updater is running');