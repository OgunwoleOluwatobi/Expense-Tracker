import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

export const AddTransaction = () => {
    
    const { addTransaction, transaction, updateTransactions } = useContext(GlobalContext);
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        const newTransaction = {
            id: uuidv4(),
            text,
            amount: +amount
        };

        addTransaction(newTransaction);
        setText('');
        setAmount('');
    };

    const onUpdate = e => {
        e.preventDefault();
        console.log(text);
        const updateTransaction = {
            text: text === '' ? transaction[0].text : text,
            amount: amount === '' ? transaction[0].amount : +amount
        };

        updateTransactions(transaction[0].id, updateTransaction);
        setText('');
        setAmount('');
    };

    let body = (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label htmlFor="amount"
                    >Amount <br />
                    (negative - expense, positive - income)</label
                >
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    );

    if(transaction) {
        body = (
            <>
                <h3>Edit transaction</h3>
                <form onSubmit={onUpdate}>
                    <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={transaction[0].text} />
                    </div>
                    <div className="form-control">
                    <label htmlFor="amount"
                        >Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={transaction[0].amount} />
                    </div>
                    <button className="btn">Update transaction</button>
                </form>
            </>
        );
    };

    return (
        <>
            {body}
        </>
    )
}
