import React from 'react';
import {Navbar, NavItem, NavLink} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../context";
import styled from "styled-components";

const LeftContainer = styled.div`
	margin-left: auto;
`;


const Nav = () => {
	const [state, setState] = useContext(UserContext);

	const navigate = useNavigate();

	const handleSignOut = () => {
		setState({
			data: null,
			loading: false,
			error: null
		});
		localStorage.removeItem('token');
		navigate('/');
	}

	// console.log(state, 'nav');

	return (
		<Navbar>
			<NavItem>
				<Link to={'/'} className={'nav-link'}>HOME</Link>
			</NavItem>
			{
				state.data && (
					<LeftContainer>
						<NavItem>
							<NavLink onClick={handleSignOut}>LEAVE</NavLink>
						</NavItem>
					</LeftContainer>
				)
			}
		</Navbar>
	);
};

export default Nav;
