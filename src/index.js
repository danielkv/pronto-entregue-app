import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@apollo/react-hooks';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import getLastError from './helpers/errors/getLastError';
import setGlobalhandler from './helpers/errors/setGlobalHandler';
import { ThemeProvider } from './react-native-ui';
import Routes from './routes';
import apolloClient from './services/apolloClient';
import { Container } from './styles';
import theme from './theme';

// set global error handler
setGlobalhandler();

export default function App() {

	useEffect(() => {
		getLastError()
	}, []);

	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={theme}>
				<StyledThemeProvider theme={theme}>
					<StatusBar style='light' animated />
					<SafeAreaProvider>
						<Container>
							<Routes />
						</Container>
					</SafeAreaProvider>
				</StyledThemeProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}