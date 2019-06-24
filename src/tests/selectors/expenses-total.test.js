import selectExpensesTotal from '../../selectors/expenses-total';
import testExpenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  expect(selectExpensesTotal([])).toBe(0);
});

test('should correctly add up a single expense', () => {
  expect(selectExpensesTotal([testExpenses[0]])).toBe(testExpenses[0].amount);
});

test('should correctly add up multiple expenses', () => {
  expect(selectExpensesTotal(testExpenses)).toBe(114195);
});