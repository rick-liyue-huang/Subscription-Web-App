import React, {useEffect, useState} from 'react';
import {Container, Card, Button} from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";


const CardsContainer = styled.div`
	display: flex;
	height: 75vh;
	align-items: center;
	justify-content: center;
`;

const CardHeader = styled.div`
	height: 20rem;
	background-color: lemonchiffon;
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
	box-shadow: 0.1rem 0.1rem 1rem rgba(30, 30, 50, 0.3);
`;

const PriceTest = styled.p`
	font-size: 3rem;
	color: white;
	text-shadow: 0.1rem 0.1rem 1rem rgba(20. 30, 40, 0.3);
`;

const ArticlePlans = () => {

	const [prices, setPrices] = useState<any[]>([]);

	useEffect(() => {
		fetchPrices();
	}, [])

	const fetchPrices = async () => {
		const response = await axios.get('http://localhost:8080/stripe/prices');
		console.log(response.data.data);
		setPrices(response.data.data);
	}

	const backgroundColor: Record<string, any> = {
		basic: 'rgb(234, 225, 225)',
		standard: 'rgb(132, 179, 182)',
		premium: 'rgb(23, 45, 67)'
	}

	return (
		<Container>
			<CardsContainer>
				{
					prices.map((p: any) => {
						return (
							<Card key={p.id} style={{
								width: '18rem', marginRight: '2rem'
							}}>
								<CardHeader style={{backgroundColor: backgroundColor[p.nickname]}}>
									<PriceCircle>
										<PriceTest>
											${p.unit_amount / 100}
										</PriceTest>
									</PriceCircle>
								</CardHeader>
								<Card.Body>
									<Card.Title style={{fontSize: '2rem'}}>
										{p.nickname.toUpperCase()}
									</Card.Title>
									<Button variant={'warning'} className={'mt-1'}>Subscribe now</Button>
								</Card.Body>
							</Card>
						)
					})
				}
			</CardsContainer>
		</Container>
	);
};

export default ArticlePlans;
