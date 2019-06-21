import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import ExpenseForm from '../../components/ExpenseForm';
import testExpenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={testExpenses[0]} />);

  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();

  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  // second argument is to provide e, otherwise e would be undefined and e.preventDefault
  // would cause an errors
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);

  const value = 'New Description';

  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  // at(0): the first input

  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const wrapper = shallow(<ExpenseForm />);

  const value = 'New note';

  wrapper.find('textarea').simulate('change', {
    target: { value }
  });

  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if input is valid', () => {
  const wrapper = shallow(<ExpenseForm />);

  const amount = '23.50';

  wrapper.find('input').at(1).simulate('change', {
    target: {
      value: amount
    }
  });

  expect(wrapper.state('amount')).toBe(amount);
});

test('should not set amount if input is not valid', () => {
  const wrapper = shallow(<ExpenseForm />);

  const amount = '12.122';

  wrapper.find('input').at(1).simulate('change', {
    target: {
      value: amount
    }
  });

  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  // onSubmitSpy('Andrew', 'Philadelphia');
  // expect(onSubmitSpy).toHaveBeenCalled();
  // expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Philadelphia');

  const wrapper = shallow(<ExpenseForm expense={testExpenses[0]} onSubmit={onSubmitSpy} />);

  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: testExpenses[0].description,
    note: testExpenses[0].note,
    createdAt: testExpenses[0].createdAt,
    amount: testExpenses[0].amount
  });

});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  // for the SingleDatePicker component, call the onDateChange property with a parameter
  // (now). This leads to calling this.state.onDateChange(now), which presumably sets
  // the createdAt prop of state to be now.
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focuse on change', () => {
  const wrapper = shallow(<ExpenseForm />);

  const focused = true;

  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});