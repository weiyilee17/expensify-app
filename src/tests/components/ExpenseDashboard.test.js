import React from 'react';
import { shallow } from 'enzyme';

import ExpenseDashboard from '../../components/ExpenseDashboard';

test('should render ExpenseDashboard page', () => {
  const wrapper = shallow(<ExpenseDashboard />);

  expect(wrapper).toMatchSnapshot();
});