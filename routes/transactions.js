const express = require('express');
const router = express.Router();
const { getTransactions,  addTransaction, deleteTransactions, updateTransactions } = require('../controllers/transactionController');

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .put(updateTransactions)
    .delete(deleteTransactions);

module.exports = router;