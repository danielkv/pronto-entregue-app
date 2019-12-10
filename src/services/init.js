/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import client from './server';

import { GET_SELECTED_BRANCH } from '../graphql/branches';
import { AUTHENTICATE } from '../graphql/authentication';

export function useInitialize() {
	// logUserOut();
	// resetBranch();

	// eslint-disable-next-line no-undef
	if (__DEV__) client.writeData({ data: require('../../cart.json') });

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { data: selectedBranchData } = useQuery(GET_SELECTED_BRANCH);
	const selectedBranch = selectedBranchData ? selectedBranchData.selectedBranch : null;
	
	useEffect(()=>{
		if (!selectedBranch) setLoading(true);
	}, [selectedBranch]);
	
	if (loading && !selectedBranch) {
		init()
			.then(()=>{
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				logUserOut();
				resetBranch();
			})
	}
	
	return {
		error,
		loading,
		selectedBranch
	}
}

async function init() {
	const selectedBranch = await AsyncStorage.getItem('@copeiro/selectedBranch');
	const userToken = await AsyncStorage.getItem('@copeiro/userToken');

	if (userToken) {
		const { data } = await client.mutate({ mutation: AUTHENTICATE, variables: { token: userToken } });
		await logUserIn(data.authenticate, userToken);
	}

	if (selectedBranch) client.writeData({ data: { selectedBranch } });
	
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

export async function resetBranch() {
	await AsyncStorage.removeItem('@copeiro/selectedBranch');

	client.writeData({ data: { selectedBranch: '' } });
}