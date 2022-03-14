import React from 'react';
import {Navbar, NavItem, NavLink} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';


const Nav = () => {

	const navigate = useNavigate();
	return (
		<Navbar>
			<NavItem>
				<NavLink style={{color: '#6ca984'}} onClick={() => navigate('/')}>HOME</NavLink>
			</NavItem>
		</Navbar>
	);
};

export default Nav;
