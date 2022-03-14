import React, {Fragment, useState} from 'react';
import {Button, Modal, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

interface AuthModalProps {
	text: string;
	color: string;
	isSignupFlow: boolean
}

const ErrorMsgComponent = styled.div`
	color: red;
`;

const AuthModal: React.FC<AuthModalProps> = ({text, color, isSignupFlow}) =>  {

	const [show, setShow] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('')

	const handleClose = () => setShow(false);
	const handleOpen = () => setShow(true);

	const navigate = useNavigate()

	const handleClick = async () => {
		let data;
		if (isSignupFlow) {
			const {data: signupData} = await axios.post('http://localhost:3500/auth/signup', {
				email, password
			});
			// console.log('signup: ', data);
			data = signupData
			console.log('data: ', data);
		} else {
			const {data: loginData} = await axios.post('http://localhost:3500/auth/signin', {
				email, password
			});

			data = loginData;
			console.log('signin: ', data);
		}

		if (data.errors.length) {
			setErrorMsg(data.errors[0].msg);
		} else {
			setEmail('');
			setPassword('')
			handleClose();

		//	here everything is fine, and will store the token on localstorage
			localStorage.setItem('token', data.data.token)

			// after sign in to route to new page
			navigate('/articles')
		}
	}

	return (
		<>
			<Button variant={color} onClick={handleOpen} style={{marginRight: '1rem'}}>{text}</Button>
			<Modal
				show={show}
				onHide={handleClose}
			>
				<Modal.Header>
					<Modal.Title style={{color: 'olivedrab'}}>
						{text}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className={'mb-3'}>
						<InputGroup.Text style={{color: 'olivedrab', backgroundColor: 'white', border: 'none', paddingRight: '3.3rem'}}>EMAIL</InputGroup.Text>
						<FormControl
							type={'email'}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</InputGroup>
					<InputGroup>
						<InputGroup.Text style={{color: 'olivedrab', backgroundColor: 'white', border: 'none'}}>PASSWORD</InputGroup.Text>
						<FormControl
							type={'password'}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				{
					errorMsg && <ErrorMsgComponent>{errorMsg}</ErrorMsgComponent>
				}
				<Modal.Footer>
					<Button variant={'outline-secondary'} onClick={handleClose}>CLOSE</Button>
					<Button variant={'outline-success'} onClick={handleClick}>{text}</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AuthModal;
