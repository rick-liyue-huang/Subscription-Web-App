import React from 'react';
import styled from "styled-components";
import {Container} from "react-bootstrap";
import DialogModal from "../DialogModal";

const DashBoardComponent = styled.header`
	padding: 5rem 0;
	height: 80vh;
	background-image: url("https://images.unsplash.com/photo-1646239280993-3fed17f907df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80");
	background-size: cover;
	background-position: center;
`;


const HeaderContainer = styled.div`
	background-color: lightcyan;
	margin-left: 53rem;
	padding: 3rem;
	color: burlywood;
	width: 32.5rem;
`;

const Heading = styled.h1`
	font-size: 5rem;
`;

const SubHeading = styled.h3`
	margin: 1rem 0;
	font-weight: 400;
`;

const DashBoard = () => {
	return (
		<DashBoardComponent>
			<Container>
				<HeaderContainer>
					<Heading>Absorb</Heading>
					<SubHeading>Know more about the world</SubHeading>
					<DialogModal
						text={'SignUp'} variant={'info'} isSignupFlow={true}
					/>
					<DialogModal
						text={'SignIn'} variant={'warning'} isSignupFlow={false}
					/>
				</HeaderContainer>
			</Container>
		</DashBoardComponent>
	);
};

export default DashBoard;
