import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Go Home</NavLink>
        <br />
        <NavLink to="/create" activeClassName="is-active">Go to add expense page</NavLink>
        <br />
    </header>
);

export default Header;