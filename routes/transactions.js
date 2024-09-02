const express=require('express')
const transactionController=require('../controllers/transactions')
const expenceController=require('../controllers/totalExpense')
const router=express.Router()

router.get('/transactions',transactionController.getTransactions)

router.get('/totalExpense',expenceController.expenses)

module.exports = router;