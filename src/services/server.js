import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import resolvers from '../resolvers';
import { GET_USER_TOKEN, IS_USER_LOGGED_IN } from '../graphql/authentication';
import { GET_SELECTED_COMPANY } from '../graphql/companies';
import { GET_SELECTED_BRANCH } from '../graphql/branches';

const host = process.env.NODE_ENV === 'production' ? 'https://flakery-backend.herokuapp.com/graphql' : 'http://192.168.234.2:4000/graphql';
const httpLink = new HttpLink({ uri: host });

const cache = new InMemoryCache({});

const initialData = {
	authenticated: false,
	initialized: false,
	isUserLoggedIn: false,
	userToken: null,
	selectedCompany: 1, // ID da empresa
	selectedBranch: '',
}

cache.writeData({ data: initialData });

const authLink = new ApolloLink((operation, forward)=> {
	const { isUserLoggedIn } = cache.readQuery({ query: IS_USER_LOGGED_IN });
	const set_headers = {};

	const { userToken } = cache.readQuery({ query: GET_USER_TOKEN });
	if (isUserLoggedIn && userToken) set_headers.authorization = `Bearer ${userToken}`;

	const { selectedCompany } = cache.readQuery({ query: GET_SELECTED_COMPANY });
	if (selectedCompany) set_headers.company_id = selectedCompany;
	
	const { selectedBranch } = cache.readQuery({ query: GET_SELECTED_BRANCH });
	if (selectedBranch) set_headers.branch_id = selectedBranch;
	
	operation.setContext(({ headers }) => {
		return {
			headers: { ...headers, ...set_headers }
		}
	});
	
	return forward(operation);
})

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([authLink, httpLink]),
	resolvers
});

client.onResetStore(()=>cache.writeData({ data: initialData }));

export default client;