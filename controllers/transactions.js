const axios = require('axios')
const Crypto = require('../schemas/transactions')

exports.getTransactions = async (req, res) => {
    const address = req.query.address
    const apiKey = process.env.API_KEY

    try {
        const transactionsApiRes = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`)
        const transactions = transactionsApiRes.data;

        const ethPriceApiRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
        const ethPrice = ethPriceApiRes.data;

        const updatedDoc = await Crypto.findOneAndUpdate(
            { address: address },
            {
                $set: { ethereum_price: ethPrice.ethereum.inr },
                $addToSet: { transactions: { $each: transactions.result } }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        )
        return res.json(updatedDoc)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch transactions' });
    }
}
