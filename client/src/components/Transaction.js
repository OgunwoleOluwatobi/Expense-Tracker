import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
    const { deleteTransaction, updateTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';

    const click = (id, text, amount) => {
        const update = {
            id,
            text,
            amount: +amount
        };

        updateTransaction(update);
    }

    return (
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            <div className="out" onClick={() => click(transaction._id, transaction.text, transaction.amount)}>{transaction.text} <span>{sign}₦{numberWithCommas(Math.abs(transaction.amount))}</span></div>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>x</button>
        </li>
    )
}
