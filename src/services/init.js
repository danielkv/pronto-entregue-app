import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import client from './server';

import { GET_SELECTED_BRANCH } from '../graphql/branches';

export function useInitialize() {
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
	const selectedBranch = await AsyncStorage.getItem('@flakery/selectedBranch');
	
	if (!selectedBranch) return false;
	client.writeData({ data: { selectedBranch } });
	
	return true;
}

export function logUserIn(token) {
	AsyncStorage.setItem('@flakery/userToken', token);
	client.writeData({ data: { isUserLoggedIn: true, userToken: token } });
}

export function logUserOut() {
	AsyncStorage.removeItem('@flakery/userToken');
	AsyncStorage.removeItem('@flakery/selectedBranch');
	client.writeData({ data: { userToken: null, authenticated: false, isUserLoggedIn: false } });
	client.resetStore();
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