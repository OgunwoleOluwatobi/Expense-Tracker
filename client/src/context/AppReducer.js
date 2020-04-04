export default ( state, action) => {
    switch (action.type) {
        case 'GET_TRANSACTION':
            return {
                ...state,
                transactions: action.payload
            };
        case 'DELETE_TRANSACTION':
            return{
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload),
                transaction: null
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            };
        case 'UPDATE_TRANSACTION':
            return{
                ...state,
                transaction: [action.payload]
            }
        case 'UPDATE_TRANSACTIONS':
            return{
                ...state,
                transaction: null
            };
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default: return state;
    }
}