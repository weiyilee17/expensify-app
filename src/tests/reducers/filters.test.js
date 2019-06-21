import moment from 'moment';

import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' });

	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

	expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const action = { type: 'SORT_BY_DATE' }
	const state = filtersReducer(currentState, action);

	expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
	const testText = 'lala';
	const action = {
		type: 'SET_TEXT_FILTER',
		text: testText
	};
	const state = filtersReducer(undefined, action);

	expect(state.text).toBe(testText);
});

test('should set startDate filter', () => {
	const testStartDate = moment(0).add(4, 'days');
	const action = {
		type: 'SET_START_DATE',
		startDate: testStartDate
	};
	const state = filtersReducer(undefined, action);

	expect(state.startDate).toEqual(testStartDate);
});

test('should set endDate filter', () => {
	const testEndDate = moment(0).subtract(4, 'days');
	const action = {
		type: 'SET_END_DATE',
		endDate: testEndDate
	};
	const state = filtersReducer(undefined, action);

	expect(state.endDate).toEqual(testEndDate);
});