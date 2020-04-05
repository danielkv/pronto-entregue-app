import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@apollo/react-hooks';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { ThemeProvider } from './react-native-ui';
import Routes from './routes';
import apolloClient from './services/server';
import { Container } from './styles';
import theme from './theme';

export default function App() {
	return (
		<SafeAreaProvider>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider theme={theme}>
					<StyledThemeProvider theme={theme}>
						
						<Container>
							<Routes />
						</Container>
						
					</StyledThemeProvider>
				</ThemeProvider>
			</ApolloProvider>
		</SafeAreaProvider>
	);
}