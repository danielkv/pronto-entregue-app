import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import apolloClient from './services/server';
import { ApolloProvider } from "@apollo/react-hooks";

import { Container } from "./styles";
import Routes from './routes';

export default function RootRoutes() {
	return (
		<ApolloProvider client={apolloClient}>
			<SafeAreaProvider>
				<Container>
					<Routes/>
				</Container>
			</SafeAreaProvider>
		</ApolloProvider>
 	);
}