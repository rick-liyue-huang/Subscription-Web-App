import {createContext, useEffect, useState} from "react";
import axios from "axios";

interface UserProps {
	data: {
		id: string;
		email: string;
		stripeCustomerId: string;
	} | null;
	error: string |null;
	loading: boolean;
}

const UserContext = createContext<[UserProps, React.Dispatch<React.SetStateAction<UserProps>>]>([
	{
		data: null,
		loading: true,
		error: null
	},
	() => {}
]);

const UserProvider = ({children}: any) => {
	const [user, setUser] = useState<UserProps>({
		data: null,
		loading: true,
		error: null
	});

	const token = localStorage.getItem('token');

	// add globally the token on headers
	if (token) {
		axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
	}

	const fetchUser = async () => {
		const {data} = await axios.get('http://localhost:8080/auth/me');

		if (data.data && data.data.user) {
			setUser({
				data: {
					id: data.data.user.id,
					email: data.data.user.email,
					stripeCustomerId: data.data.user.stripeCustomerId
				},
				loading: false,
				error: null
			})
		} else if (data.data && data.data.errors.length) {
			setUser({
				data: null,
				loading: false,
				error: data.errors[0].msg
			})
		}
		console.log(data);
	}

	useEffect(() => {
		if (token) {
			fetchUser();
		} else {
			setUser({
				data: null,
				loading: false,
				error: null
			})
		}
	}, [])

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	)

};

export {UserContext, UserProvider}
