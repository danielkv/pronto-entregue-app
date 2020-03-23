import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError, ErrorLink } from "apollo-link-error";
import { HttpLink } from 'apollo-link-http';

import resolvers from '../resolvers';
import { schema as typeDefs } from '../schema/cart';

import { GET_SELECTED_ADDRESS } from '../graphql/addresses';
import { GET_USER_TOKEN } from '../graphql/authentication';

const host = process.env.NODE_ENV === 'production' ? 'https://flakery-backend.herokuapp.com/graphql' : 'http://10.1.1.170:4000/graphql';

const httpLink = new HttpLink({ uri: host });

const cache = new InMemoryCache({});

const initialData = {
	loggedUserId: null,
	userToken: null,
	selectedAddress: null,

	// CART
	cartCompany: null,
	cartDelivery: null,
	cartPayment: null,
	cartItems: [],
	cartPrice: 0,
	cartMessage: '',
	cartDiscount: 0,
}

cache.writeData({ data: initialData });

const authLink = new ApolloLink((operation, forward)=> {
	const tempHeaders = {};
	
	const { userToken } = cache.readQuery({ query: GET_USER_TOKEN });
	if (userToken) tempHeaders.authorization = `Bearer ${userToken}`;
	
	const { selectedAddress } = cache.readQuery({ query: GET_SELECTED_ADDRESS });
	if (selectedAddress) tempHeaders.selectedaddress = JSON.stringify(selectedAddress);
	
	operation.setContext(({ headers }) => {
		return {
			headers: { ...headers, ...tempHeaders }
		}
	});
	
	return forward(operation);
})

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
	
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
  
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([authLink, httpLink]),
	resolvers,
	typeDefs
});

client.onResetStore(()=>cache.writeData({ data: initialData }));

export default client;