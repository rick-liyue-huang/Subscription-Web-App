import {Outlet, Navigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context";
import {Spinner} from "react-bootstrap";

export const ProtectedRoute = () => {
	const [state] = useContext(UserContext);

	if (state.loading) return (
		<div>
			<Spinner animation={'border'} />
		</div>
	)

	return state.data ?
		<Outlet /> :
		<Navigate to={'/'} />
}
