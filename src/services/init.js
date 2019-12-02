/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import client from './server';

import { GET_SELECTED_BRANCH } from '../graphql/branches';

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
			.catch((err)=>{
				setError(err);
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

	if (userToken) await logUserIn(userToken);

	if (selectedBranch) client.writeData({ data: { selectedBranch } });
	
	return true;
}

export async function logUserIn(token) {
	await AsyncStorage.setItem('@copeiro/userToken', token);
	client.writeData({ data: { isUserLoggedIn: true, userToken: token } });
}

export async function logUserOut() {
	await AsyncStorage.removeItem('@copeiro/userToken');
	client.writeData({ data: { userToken: null, isUserLoggedIn: false } });
}

export async function resetBranch() {
	await AsyncStorage.removeItem('@copeiro/selectedBranch');
	client.writeData({ data: { selectedBranch: '' } });
}