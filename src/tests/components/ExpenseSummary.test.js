import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseSummary } from '../../components/ExpenseSummary';

test('should render 0 expense when no expenses are provided', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={0} expensesTotal={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render multiple expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={2} expensesTotal={323} />);
  expect(wrapper).toMatchSnapshot();
});