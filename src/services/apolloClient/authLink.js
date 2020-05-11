import { ApolloLink } from 'apollo-link';

import cache from './apolloCache';

import { GET_SELECTED_ADDRESS } from '../../graphql/addresses';
import { GET_USER_TOKEN } from '../../graphql/authentication';
import { GET_SELECTED_COMPANY } from '../../graphql/users';

export default new ApolloLink((operation, forward)=> {
	const tempHeaders = {};
	
	const { userToken } = cache.readQuery({ query: GET_USER_TOKEN });
	if (userToken) tempHeaders.authorization = `Bearer ${userToken}`;
	
	const { selectedAddress } = cache.readQuery({ query: GET_SELECTED_ADDRESS });
	if (selectedAddress) tempHeaders.selectedaddress = JSON.stringify(selectedAddress);

	const { selectedCompany } = cache.readQuery({ query: GET_SELECTED_COMPANY });
	if (selectedCompany) tempHeaders.companyId = selectedCompany;
	
	operation.setContext(({ headers }) => {
		return {
			headers: { ...headers, ...tempHeaders }
		}
	});
	
	return forward(operation);
})