import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import resolvers from '../resolvers';
import { GET_USER_TOKEN, IS_USER_LOGGED_IN } from '../graphql/authentication';
import { schema as typeDefs } from '../schema/cart';
import { GET_SELECTED_USER_ADDRESS } from '../graphql/users';

const host = process.env.NODE_ENV === 'production' ? 'https://flakery-backend.herokuapp.com/graphql' : 'http://192.168.234.2:4000/graphql';

const httpLink = new HttpLink({ uri: host });

const cache = new InMemoryCache({});

const initialData = {
	loggedUserId: null,
	isUserLoggedIn: false,
	userToken: null,
	selectedAddress: '',

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
	const set_headers = {};

	const { userToken } = cache.readQuery({ query: GET_USER_TOKEN });
	if (isUserLoggedIn && userToken) set_headers.authorization = `Bearer ${userToken}`;

	const { selectedAddress } = cache.readQuery({ query: GET_SELECTED_USER_ADDRESS });
	if (selectedAddress) set_headers.address_id = selectedAddress;

	// console.log(set_headers);
	
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
	resolvers,
	typeDefs,
});

client.onResetStore(()=>cache.writeData({ data: initialData }));

export default client;