import React from 'react';
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import {useState} from "react";
import axios from 'axios';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'


interface ModalProps {
	text: string;
	variant: 'info' | 'success' | 'warning';
	isSignupFlow: boolean;
}

const ErrorMsgComp = styled.p`
	color: red;
`;

const DialogModal: React.FC<ModalProps> = ({text, variant, isSignupFlow}) => {

	const [show, setShow] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleClose = () => setShow(false);
	const handleOpen = () => setShow(true);

	const navigate = useNavigate();

	const styleObj = {
		display: 'inline-block',
		paddingRight: '2.7rem'
	}

	const handleClick = async () => {
		let data;
		if (isSignupFlow) {
			const {data: signupData} = await axios.post('http://localhost:8080/auth/signup', {
				email, password
			});
			data = signupData;
			console.log(data);
		} else {
			const {data: signinData} = await axios.post('http://localhost:8080/auth/signin', {
				email, password
			});
			data = signinData;
			console.log(data);
		}

		if (data.errors.length > 0) {
			return setErrorMsg(data.errors[0].msg)
		}

		localStorage.setItem('token', data.data.token);
		navigate('/articles')
	}

	return (
		<>
			<Button variant={variant} onClick={handleOpen} size={'lg'}
							style={{marginRight: '1rem', padding: '0.5rem 2rem'}}
			>{text}</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>
						{text}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className={'mb-3'}>
						<InputGroup.Text style={styleObj}>
							Email:
						</InputGroup.Text>
						<FormControl
							type={'email'} value={email}
						  onChange={e => setEmail(e.target.value)}
						/>
					</InputGroup>
					<InputGroup className={'mb-3'}>
						<InputGroup.Text>
							Password:
						</InputGroup.Text>
						<FormControl
							type={'password'}
						  value={password} onChange={e => setPassword(e.target.value)}
						/>
					</InputGroup>
					{
						errorMsg && <ErrorMsgComp>{errorMsg}</ErrorMsgComp>
					}
				</Modal.Body>
				<Modal.Footer>
					<Button variant={'secondary'} onClick={handleClose}>Close</Button>
					<Button variant={'primary'} onClick={handleClick}>{text}</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DialogModal;
