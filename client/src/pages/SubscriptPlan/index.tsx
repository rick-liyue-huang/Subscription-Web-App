import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import {Card} from "react-bootstrap";

const CardsContainer = styled.div`
	display: flex;
	height: 75vh;
	align-items: center;
	justify-content: center;
`;

const CardHeader = styled.div`
	height: 20rem;
	border-radius: 50%;
	background-color: cadetblue;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PriceCircle = styled.div`
	border: 0.5rem solid wheat;
	width: 12.5rem;
	height: 12.5rem;
	border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
	box-shadow: 0.1rem 0.1rem 1rem rgba(19, 34, 20, 0.3);
`;

const PriceText = styled.div`
	font-size: 3rem;
	color: wheat;
`;


const MyBody = styled(Card.Body)`
  display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SubscriptPlan = () => {

	const [prices, setPrices] = useState<any[]>([]);

	const backgroundColors: any = {
		BASIC: '#d1e32b',
		STANDARD: '#36ace3',
		ADVANCED: '#e36f3d',
		PREMIUM: '#ba32e3'
	}

	const fetchPrices = async () => {
		const response = await axios.get('http://localhost:3500/subscript/prices');
		console.log('response: ', response);
		setPrices(response.data.prices.data)
	}

	useEffect(() => {
		fetchPrices();
	}, []);


	const createSessionHandler = async (priceId: string) => {
		const {data} = await axios.post('http://localhost:3500/subscript/session', {
			priceId,
		});

		window.location.href = data.url
	}

	return (
		<Container>
			<CardsContainer>
				{
					prices.map((p: any) => (
						<Card style={{border: 'none', width: '20rem', marginRight: '2rem'}}>
							<CardHeader
								style={{backgroundColor: backgroundColors[p.nickname.toUpperCase()]}}
							>
								<PriceCircle>
									<PriceText>
										${p.unit_amount / 100}
									</PriceText>

								</PriceCircle>
							</CardHeader>
							<MyBody style={{}}>
								<Card.Title style={{color: 'bisque', fontSize: '2rem'}}>
									{p.nickname}
								</Card.Title>
								<Button
									variant={'warning'}
									style={{backgroundColor: '#6ca984', color: 'white', border: 'none'}}
									onClick={() => createSessionHandler(p.id)}
								>Subscript</Button>
							</MyBody>
						</Card>
					))
				}
			</CardsContainer>
		</Container>
	);
};

export default SubscriptPlan;
