import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth'


export const Header = ({ startLogout }) => (
	<header>
		<h1>Expensify</h1>
		<NavLink to="/dashboard" activeClassName="is-active">Go Home</NavLink>
		<br />
		<NavLink to="/create" activeClassName="is-active">Go to add expense page</NavLink>
		<br />
		<button onClick={startLogout} >Logout</button>
	</header>
);

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);