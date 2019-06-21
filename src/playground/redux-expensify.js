import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expenses: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});



// Expense Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': 
            return [...state, action.expenses];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => action.id !== id);
        case 'EDIT_EXPENSE' :
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense, // all other props from expense. i.e. id, description, 
                                    // note, amount, createAt
                        ...action.updates   // in the example's case, it's amount: 500
                    }
                } 
                else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

// timestamps (count in milliseconds, starts from 1970/1/1 (unix epoch)
// 33400 = 33.4 sec after 1970/1/1
// -203 = .203 sec before 1970/1/1




// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    // destructuring filter
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {    // sort by date, later first, recent later
            return b.createdAt - a.createdAt;
        }
        else {  // sort by amount, bigger first, less later
            return b.amount - a.amount;
        }
    });
};


// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: 'Rent', 
    amount: 100,
    createdAt: 1000
}));
const expenseTwo = store.dispatch(addExpense({
    description: 'Coffee', 
    amount: 300,
    createdAt: -1000
}));

// store.dispatch(removeExpense({id:expenseOne.expenses.id}));
// store.dispatch(editExpense(expenseTwo.expenses.id, {amount: 500}))

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByDate());
store.dispatch(sortByAmount());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250));


const demoState = {
    expenses: [{
        id: 'asdljf',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,  // in cents
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',    // date or amount
        startDate: undefined,
        endDate: undefined
    }
}

// spread operator on object. Useful because redux doesn't want to change original objs

// const user = {
//     name: 'Jen',
//     age: 24
// };

// console.log({
//     // age: 34, // gets override to 24
//     ...user,
//     location: 'Philadelphia',
//     age: 27 // overrides to 34
// });