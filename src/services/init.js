import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import client from './server';

import { GET_SELECTED_BRANCH } from '../graphql/branches';
import { LOGGED_USER } from '../graphql/authentication';

export function useInitialize() {
	/* logUserOut();
	resetBranch(); */

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { data: selectedBranchData } = useQuery(GET_SELECTED_BRANCH);
	const selectedBranch = selectedBranchData ? selectedBranchData.selectedBranch : null;
	
	useEffect(()=>{
		if (!selectedBranch) setLoading(true);
	}, [selectedBranch]);
	
	if (!selectedBranch) {
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
	await client.query({ query: LOGGED_USER });
}

export async function logUserOut() {
	await AsyncStorage.removeItem('@copeiro/userToken');
	client.writeData({ data: { userToken: null, authenticated: false, isUserLoggedIn: false } });
}

export async function resetBranch() {
	await AsyncStorage.removeItem('@copeiro/selectedBranch');
	client.writeData({ data: { selectedBranch: '' } });
}


/*
async function authenticate() {
	const {data:userData} = await client.query({query:LOGGED_USER});
	
	if (!userData.me) return false;

	client.writeData({data:{isUserLoggedIn:true, authenticated:true}});
	return true;
}
 
function loadInitialData() {
	return client.query({query:GET_USER_COMPANIES})
	.then (async ({data})=> {
		const {selectedCompany} = client.readQuery({query:GET_SELECTED_COMPANY});
		const selectCompany_id = selectedCompany || data.userCompanies[0].id;

		client.writeData({data:{initialized:true}});

		await client.mutate({mutation:SELECT_COMPANY, variables:{id:selectCompany_id}});

		return true;
	});
} */