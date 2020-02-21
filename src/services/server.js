import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

import resolvers from '../resolvers';
import { schema as typeDefs } from '../schema/cart';

import { GET_USER_TOKEN, IS_USER_LOGGED_IN } from '../graphql/authentication';
import { GET_SELECTED_USER_ADDRESS } from '../graphql/users';

const host = process.env.NODE_ENV === 'production' ? 'https://flakery-backend.herokuapp.com/graphql' : 'http://10.1.1.170:4000/graphql';

const httpLink = new HttpLink({ uri: host });

const cache = new InMemoryCache({});

const initialData = {
	loggedUserId: null,
	isUserLoggedIn: false,
	userToken: null,
	selectedAddress: null,

	// CART
	cartDelivery: null,
	cartPayment: null,
	cartItems: [],
	cartPrice: 0,
	cartMessage: '',
	cartDiscount: 0,
}

cache.writeData({ data: initialData });

const authLink = new ApolloLink((operation, forward)=> {
	const { isUserLoggedIn } = cache.readQuery({ query: IS_USER_LOGGED_IN });
	const tempHeaders = {};

	const { userToken } = cache.readQuery({ query: GET_USER_TOKEN });
	if (isUserLoggedIn && userToken) tempHeaders.authorization = `Bearer ${userToken}`;

	const { selectedAddress } = cache.readQuery({ query: GET_SELECTED_USER_ADDRESS });
	// eslint-disable-next-line camelcase
	if (selectedAddress) tempHeaders.address_id = selectedAddress;

	// console.log(set_headers);
	
	operation.setContext(({ headers }) => {
		return {
			headers: { ...headers, ...tempHeaders }
		}
	});
	
	return forward(operation);
})

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([authLink, httpLink]),
	resolvers,
	typeDefs,
});

client.onResetStore(()=>cache.writeData({ data: initialData }));

export default client;