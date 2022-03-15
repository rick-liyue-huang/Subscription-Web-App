import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import {Link} from "react-router-dom";


interface ArticleProps {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
}

const CardContainer = styled.div`
	padding: 4rem 0;
	display: flex;
`;

const Card = styled.div`
	height: 50rem;
	width: 32%;
	box-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
	padding: 2rem;
	border-radius: 2rem;
	margin-right: 5rem;
`;

const Image = styled.img`
	width: 100%;
	height: 30rem;
	border-radius: 2rem;
`;

const Header = styled.h2`
	margin-top: 1rem;
	font-size: 1.5rem;
`;

const Content = styled.p``;

const NoPlanContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 20rem 0;
	flex-direction: column;
	
	& a {
		font-size: 2rem;
		text-decoration: none;
	}
`;

const ErrorHeader = styled.h2`
		font-size: 3rem;
	`;

const Articles = () => {

	const [articles, setArticles] = useState<ArticleProps[]>([])

	const fetchArticlesHandler = async () => {
		const {data} = await axios.get('http://localhost:3500/articles')
		// console.log(response);
		setArticles(data);
	}


	useEffect(() => {
		fetchArticlesHandler();
	}, [])

	return (
		<Container>
			{
				articles.length ? (
					<CardContainer>
						{
							articles.map(article => (
								<Card key={article.id}>
									<Image src={article.imageUrl} />
									<Header>{article.title}</Header>
									<Content>{article.content}</Content>
								</Card>
							))
						}
					</CardContainer>
				) : (
					<NoPlanContainer>
						No plan description
						<ErrorHeader>
							<Link to={'/subscriptplan'}>Buy A Plan</Link>
						</ErrorHeader>
					</NoPlanContainer>
				)
			}
		</Container>
	);
};

export default Articles;
