/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import client from './server';

import { AUTHENTICATE, LOGGED_USER_ID } from '../graphql/authentication';
import { GET_SELECTED_USER_ADDRESS } from '../graphql/users';

export function useInitialize() {
	// logUserOut();

	// eslint-disable-next-line no-undef
	// if (__DEV__) client.writeData({ data: require('../../cart.json') });

	
	const [called, setCalled] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { data: { loggedUserId = null } = {} } = useQuery(LOGGED_USER_ID);
	const { data: { selectedAddress = null } = {} } = useQuery(GET_SELECTED_USER_ADDRESS);
	
	useEffect(()=>{
		if (loading) setCalled(false);
	}, [loading])
	
	if (!called) {
		setCalled(true);
		init()
			.then(()=>{
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				logUserOut();
				resetAddress();
			})
	}
	
	return {
		error,
		loading,
		loggedUserId,
		selectedAddress
	}
}

async function init() {
	const selectedAddress = await AsyncStorage.getItem('@copeiro/selectedAddress');
	const userToken = await AsyncStorage.getItem('@copeiro/userToken');

	if (userToken) {
		const { data } = await client.mutate({ mutation: AUTHENTICATE, variables: { token: userToken } });
		await logUserIn(data.authenticate, userToken);
	}

	if (selectedAddress) client.writeData({ data: { selectedAddress } });
	
	return true;
}

export async function logUserIn(user, token) {
	await AsyncStorage.setItem('@copeiro/userToken', token);
	client.writeData({ data: { isUserLoggedIn: true, userToken: token, loggedUserId: user.id } });
}

export async function logUserOut() {
	await AsyncStorage.removeItem('@copeiro/userToken');
	
	client.writeData({ data: { userToken: '', isUserLoggedIn: false, loggedUserId: null } });
}

export async function resetAddress() {
	await AsyncStorage.removeItem('@copeiro/selectedLocation');

	client.writeData({ data: { selectedLocation: '' } });
}