import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpenses,
	startRemoveExpense
} from '../../actions/expenses';
import testExpenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const creatMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expenseData = {};

	testExpenses.forEach(({ id, description, note, amount, createdAt }) => {
		expenseData[id] = { description, note, amount, createdAt };
	});

	database.ref('expenses').set(expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('should remove expenses from firebase', (done) => {
	const store = creatMockStore({});
	const id = testExpenses[2].id;

	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

test('should setup edit expense action object', () => {
	const action = editExpense('123', { note: 'New note value' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123',
		updates: {
			note: 'New note value'
		}
	});
});

test('should setup add expense action object with proveded values', () => {
	const action = addExpense(testExpenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: testExpenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = creatMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	};

	// check if the action is correctly dispatched
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

test('should add expense with defaults to database and store', (done) => {
	const store = creatMockStore({});
	const defaultExpenseData = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	};

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultExpenseData
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpenseData);
		done();
	});
});

test('should setup set expense action object with data', () => {
	const action = setExpenses(testExpenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses: testExpenses
	});
});

test('should fetch the expenses from firebase', (done) => {
	const store = creatMockStore({});
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses: testExpenses
		});
		done();
	});
});

