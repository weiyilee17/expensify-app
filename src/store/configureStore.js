import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

// Store creation

const rootReducer = combineReducers({
	expenses: expensesReducer,
	filters: filtersReducer,
	auth: authReducer
});

export default () => {
	const store = createStore(
		rootReducer,
		composeEnhancers(
			applyMiddleware(thunk)
		)
	);

	return store;
};
