/* eslint-disable global-require */
import { AsyncStorage } from 'react-native';

import { registerForPushNotifications, removeForPushNotifications } from '../controller/notification';
import client from './apolloClient';

import { GET_SELECTED_ADDRESS } from '../graphql/addresses';
import { AUTHENTICATE } from '../graphql/authentication';

export async function initialize() {
	if (__DEV__) client.writeData({ data: require('../../cart.json') });

	let user = null;
	const selectedAddress = await AsyncStorage.getItem('@prontoEntregue/address');
	const userToken = await AsyncStorage.getItem('@prontoEntregue/userToken');

	if (userToken) {
		const { data } = await client.mutate({ mutation: AUTHENTICATE, variables: { token: userToken } });
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
	await registerForPushNotifications(user.id);
	client.writeData({ data: { userToken: token, loggedUserId: user.id } });
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