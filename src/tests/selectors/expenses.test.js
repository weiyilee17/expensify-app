import moment from 'moment';

import selectExpenses from '../../selectors/expenses';
import testExpenses from '../fixtures/expenses';



test('should filter by text value', () => {
    const filter = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(testExpenses, filter);

    expect(result).toEqual([testExpenses[2], testExpenses[1]]);

});

test('should filter by startDate', () => {
    const filter = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpenses(testExpenses, filter);

    expect(result).toEqual([testExpenses[2], testExpenses[0]]);
});

test('should filter by endDate', () => {
    const filter = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    };
    const result = selectExpenses(testExpenses, filter);

    expect(result).toEqual([testExpenses[0], testExpenses[1]]);
});

test('should sort by date', () => {
    const filter = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(testExpenses, filter);

    expect(result).toEqual([testExpenses[2], testExpenses[0], testExpenses[1]]);
});

test('should sort by amount', () => {
    const filter = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(testExpenses, filter);

    expect(result).toEqual([testExpenses[1], testExpenses[2], testExpenses[0]]);
});