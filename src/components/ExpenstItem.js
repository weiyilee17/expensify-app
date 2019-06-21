import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseItem = ({ id, description, amount, createdAt }) => (
	<div>
		<Link to={`/edit/${id}`}>
			<h3>Description: {description}</h3>
		</Link>
		<p>Amount: {amount} - createdAt: {createdAt}</p>
	</div>
);

export default ExpenseItem;