import React from 'react';
import { shallow } from 'enzyme';

import ExpenstItem from '../../components/ExpenstItem';
import testExpenses from '../fixtures/expenses';

test('should render first fixture expense', () => {
  const wrapper = shallow(<ExpenstItem {...testExpenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
