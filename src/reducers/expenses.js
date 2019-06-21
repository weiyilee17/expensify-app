// Expense Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expenses];
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => action.id !== id);
		case 'EDIT_EXPENSE':
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