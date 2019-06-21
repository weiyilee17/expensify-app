import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenstItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
	<div>
		{
			props.expenses.length === 0 ? (
				<p>No expenses</p>
			) : (
					props.expenses.map((expense, index) => {
						return (
							<ExpenseItem {...expense} key={index} />
						)
					})
				)
		}
	</div>
);

// Tell the store what states this component needs to access
// it automatically reruns when states get changed
const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};

export default connect(mapStateToProps)(ExpenseList);