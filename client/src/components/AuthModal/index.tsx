import React, {Fragment, useState} from 'react';
import {Button, Modal, InputGroup, FormControl} from "react-bootstrap";

interface AuthModalProps {
	text: string;
	color: string;
}

const AuthModal: React.FC<AuthModalProps> = ({text, color}) =>  {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleOpen = () => setShow(true);

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
						<FormControl type={'email'} />
					</InputGroup>
					<InputGroup>
						<InputGroup.Text style={{color: 'olivedrab', backgroundColor: 'white', border: 'none'}}>PASSWORD</InputGroup.Text>
						<FormControl type={'password'} />
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant={'outline-secondary'} onClick={handleClose}>Close</Button>
					<Button variant={'outline-success'} onClick={handleClose}>CREATE</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AuthModal;
