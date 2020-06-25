import { ApolloClient } from "apollo-client";
import { from, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities';

import resolvers from '../../resolvers';
import cache, { initialData } from './apolloCache'
import authLink from "./authLink";
import uploadLink from "./uploadLink";
import webSocketLink from "./webSocketLink";

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	webSocketLink,
	from([authLink, uploadLink])
);

const client = new ApolloClient({
	cache,
	link: splitLink,
	resolvers,
});

// on reset cache listener
client.onResetStore(()=>cache.writeData({ data: initialData }));

// export apollo client
export default client;