import React from 'react';
import {Navbar, NavItem, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";


const Nav = () => {
	return (
		<Navbar>
			<NavItem>
				<Link to={'/'} className={'nav-link'}>HOME</Link>
			</NavItem>
		</Navbar>
	);
};

export default Nav;
