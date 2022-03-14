import React from 'react';
import styled from 'styled-components';
import {Container} from 'react-bootstrap';
import AuthModal from "../AuthModal";

const DashboardComponent = styled.header`
	padding: 15rem 0;
	height: 80vh;
	background-image: url("https://images.unsplash.com/photo-1646900069517-955d7253efa0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80");
	background-size: cover;
	background-position: top;
`;

const HeaderContainer = styled.div`
	background-color: lightgoldenrodyellow;
	padding: 3rem;
	color: #6ca984;
	width: 32.5rem;
`;

const HeadingComponent = styled.h1`
	font-size: 5rem;
`;

const SubHeadingComponent = styled.h3`
	margin: 1rem 0;
	font-weight: 300;
`;



const Dashboard = () => {
	return (
		<DashboardComponent>
			<Container>
				<HeaderContainer>
					<HeadingComponent>Absorb</HeadingComponent>
					<SubHeadingComponent>
						Know. More. About. The. World. besides...
					</SubHeadingComponent>
					<AuthModal
						text={'SIGNUP'}
						color={'warning'}
						isSignupFlow={true}
					/>
					<AuthModal
						text={'SIGNIN'}
						color={'success'}
						isSignupFlow={false}
					/>
				</HeaderContainer>
			</Container>
		</DashboardComponent>
	);
};

export default Dashboard;
