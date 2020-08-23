import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { StatusBar } from 'expo-status-bar';


import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { ThemeProvider } from './react-native-ui';
import Routes from './routes';
import apolloClient from './services/apolloClient';
import { Container } from './styles';
import theme from './theme';

export default function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={theme}>
				<StyledThemeProvider theme={theme}>
					<StatusBar style='light' animated />
					<Container>
						<Routes />
					</Container>
						
				</StyledThemeProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}