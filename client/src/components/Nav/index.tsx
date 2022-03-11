import React from 'react';
import {Navbar, NavItem, NavLink} from 'react-bootstrap';

const Nav = () => {
	return (
		<Navbar>
			<NavItem>
				<NavLink style={{color: '#6ca984'}}>HOME</NavLink>
			</NavItem>
		</Navbar>
	);
};

export default Nav;
