/* eslint-disable global-require */
import { AsyncStorage } from 'react-native';

import { sanitizeAddress } from '../controller/address';
import { registerForPushNotifications, removeForPushNotifications } from '../controller/notification';
import client from './apolloClient';

import { SET_SELECTED_ADDRESS, GET_SELECTED_ADDRESS, SET_USER_ADDRESS, GET_ADDRESS } from '../graphql/addresses';
import { AUTHENTICATE } from '../graphql/authentication';

export async function initialize() {
	//if (__DEV__) client.writeData({ data: require('../../cart.json') });

	let user = null;
	const selectedAddress = await AsyncStorage.getItem('@prontoEntregue/address');
	const userToken = await AsyncStorage.getItem('@prontoEntregue/userToken');
	let address = null;

	if (userToken) {
		const { data } = await client.mutate({ mutation: AUTHENTICATE, variables: { token: userToken } });
		await logUserIn(data.authenticate, userToken);
		user = data.authenticate;
	}

	if (selectedAddress) {
		address = JSON.parse(selectedAddress)
		if (address.id && typeof address.complement === 'undefined') {
			const { data } = await client.query({ query: GET_ADDRESS, variables: { id: address.id } });
			address = data.address;
		}
		
		if (address) await client.mutate({ mutation: SET_SELECTED_ADDRESS, variables: { address } })
	}
	
	return {
		user,
		address,
	};
}

export async function logUserIn(user, token) {
	const { data: { selectedAddress } } = await client.query({ query: GET_SELECTED_ADDRESS });

	await AsyncStorage.setItem('@prontoEntregue/userToken', token);
	await registerForPushNotifications(user.id);
	client.writeData({ data: { userToken: token, loggedUserId: user.id } });

	if (selectedAddress) await client.mutate({ mutation: SET_USER_ADDRESS, variables: { addressData: sanitizeAddress(selectedAddress), userId: user.id } });
}

export async function logUserOut() {
	await removeForPushNotifications();
	await AsyncStorage.removeItem('@prontoEntregue/userToken');
	client.writeData({ data: { userToken: '', loggedUserId: null } });
}

export async function resetAddress() {
	await AsyncStorage.removeItem('@prontoEntregue/address');

	client.writeData({ data: { selectedLocation: '' } });
}