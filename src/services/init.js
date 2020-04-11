/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import client from './server';

import { GET_SELECTED_ADDRESS } from '../graphql/addresses';
import { AUTHENTICATE, LOGGED_USER_ID } from '../graphql/authentication';

export function useInitialize() {
	// logUserOut();
	// resetAddress()

	//if (__DEV__) client.writeData({ data: require('../../cart.json') });

	const [called, setCalled] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { data: { loggedUserId = null } = {} } = useQuery(LOGGED_USER_ID);
	const { data: { selectedAddress = null } = {} } = useQuery(GET_SELECTED_ADDRESS);

	useEffect(()=>{
		if (loading) setCalled(false);
	}, [loading, loggedUserId])
	
	if (!called) {
		setCalled(true);
		initialize()
			.catch((err) => {
				setError(err);
				logUserOut();
				resetAddress();
			})
			.finally(()=>{
				setLoading(false);
			})
	}
	
	return {
		error,
		loading,
		loggedUserId,
		selectedAddress
	}
}

export async function initialize() {
	let user = null;
	const selectedAddress = await AsyncStorage.getItem('@prontoEntregue/address');
	const userToken = await AsyncStorage.getItem('@prontoEntregue/userToken');

	if (userToken) {
		const { data } = await client.mutate({ mutation: AUTHENTICATE, variables: { token: userToken } })
		await logUserIn(data.authenticate, userToken);
		user = data.authenticate;
	}

	if (selectedAddress) client.writeQuery({ query: GET_SELECTED_ADDRESS, data: { selectedAddress: JSON.parse(selectedAddress) } });
	
	return {
		user,
		address: selectedAddress || null,
	};
}

export async function logUserIn(user, token) {
	await AsyncStorage.setItem('@prontoEntregue/userToken', token);
	client.writeData({ data: { userToken: token, loggedUserId: user.id } });
}

export async function logUserOut() {
	await AsyncStorage.removeItem('@prontoEntregue/userToken');
	client.writeData({ data: { userToken: '', loggedUserId: null } });
}

export async function resetAddress() {
	await AsyncStorage.removeItem('@prontoEntregue/address');

	client.writeData({ data: { selectedLocation: '' } });
}