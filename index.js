const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose')
const transactionsRoutes=require('./routes/transactions')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(transactionsRoutes)


mongoose.connect(process.env.MONGO_KEY)
.then(res=>{
    console.log('Connected to MongoDB')
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})

