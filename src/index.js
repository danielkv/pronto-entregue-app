import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/react-hooks';

import { ThemeProvider } from 'react-native-elements';
import apolloClient from './services/server';

// import theme from './theme';
import { Container } from './styles';
import RootRoutes from './rootRoutes';
import theme from './theme';

export default function App() {
	return (
		<SafeAreaProvider>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider theme={theme}>
					<Container>
						<RootRoutes />
					</Container>
				</ThemeProvider>
			</ApolloProvider>
		</SafeAreaProvider>
	);
}