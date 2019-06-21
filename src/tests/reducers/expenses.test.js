import moment from 'moment';

import expensesReducer from '../../reducers/expenses';
import testExpenses from '../fixtures/expenses';



test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: testExpenses[1].id
  };
  const state = expensesReducer(testExpenses, action);

  expect(state).toEqual([testExpenses[0], testExpenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(testExpenses, action);

  expect(state).toEqual(testExpenses);
});

test('should add an expense', () => {
  const newExpense = {
    id: '205',
    description: 'test description',
    note: 'test note',
    amount: 56700,
    createdAt: moment(0).add(4, 'months')
  };
  const action = {
    type: 'ADD_EXPENSE',
    expenses: newExpense
  };
  const state = expensesReducer(testExpenses, action);

  expect(state).toEqual([...testExpenses, action.expenses]);
});

test('should edit an expense if id found', () => {
  const testUpdate = {
    amount: 300
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: testExpenses[0].id,
    updates: testUpdate
  };
  const state = expensesReducer(testExpenses, action);

  expect(state[0].amount).toBe(300);

});

test('should not edit an expense if id not found', () => {
  const testUpdate = {
    amount: 300
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: '0',
    updates: testUpdate
  };
  const state = expensesReducer(testExpenses, action);

  expect(state).toEqual(testExpenses);

});