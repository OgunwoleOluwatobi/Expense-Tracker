const Transaction = require('../models/Transaction');

//@desc Get all transactions
//@route GET /api/v1/transactions
//@acess public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find().sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc Add transactions
//@route POST /api/v1/transactions
//@acess public
exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
        
    }
}

//@desc Update transaction
//@route PUT /api/v1/transactions/:id
//@acess public
exports.updateTransactions = async (req, res, next) => {
    try {
        var condition = {_id: req.params.id}

        const transaction = await Transaction.update(condition, req.body);

        return res.status(200).json({
            success: true,
            data: []
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc Delete transaction
//@route DELETE /api/v1/transactions/:id
//@acess public
exports.deleteTransactions = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }

        await transaction.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}