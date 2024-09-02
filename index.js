const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose')
const transactionsRoutes=require('./routes/transactions')
const PORT=process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(transactionsRoutes)

app.use('/',(req,res)=>{
    res.render('tabs/CryptoAPI')
})

mongoose.connect(process.env.MONGO_KEY)
.then(res=>{
    console.log('Connected to MongoDB')
    app.listen(PORT)
}).catch(err=>{
    console.log(err)
})

