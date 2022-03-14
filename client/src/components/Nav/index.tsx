import React, {useContext} from 'react';
import {Navbar, NavItem, NavLink} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../../context";
import styled from "styled-components";

const LeftContainer = styled.div`
	margin-left: auto;
`;

const Nav = () => {

	const navigate = useNavigate();
	const [state, setState] = useContext(UserContext);

	console.log('state: ', state);

	const handleSignOut = () => {
		setState({data: null, loading: false, error: null});
		localStorage.removeItem('token');
		navigate('/');
	}

	return (
		<Navbar>
			<NavItem>
				<NavLink style={{color: '#6ca984'}} onClick={() => navigate('/')}>HOME</NavLink>
			</NavItem>
			{
				state.data && (
					<LeftContainer>
						<NavItem>
							<NavLink style={{color: '#6ca984'}} onClick={handleSignOut}>SIGNOUT</NavLink>
						</NavItem>
					</LeftContainer>
				)
			}
		</Navbar>
	);
};

export default Nav;
