const axios = require('axios')
const Crypto = require('../schemas/transactions')

exports.expenses = async (req, res) => {
    const address = req.query.address

    const cryptoDocs = await Crypto.findOne({ address: address });

    const transactions = await cryptoDocs.transactions

    // Calculate the total sum
    const totalSum = transactions.reduce((sum, transaction) => sum + ((transaction.gasUsed * transaction.gasPrice) / 1e18), 0);

    const ethPriceApiRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
    const ethPrice = ethPriceApiRes.data;

    res.json({
        TotalExppenses: totalSum,
        Ethereum_Price: ethPrice.ethereum.inr
    })
}