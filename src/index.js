import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/react-hooks';

import { ThemeProvider } from 'react-native-elements';
import apolloClient from './services/server';

// import theme from './theme';
import { Container } from './styles';
import RootScreen from './SplashScreen';
import theme from './theme';
// import { ErrorBoundary } from './utils/errors';

export default function App() {
	return (
		<SafeAreaProvider>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider theme={theme}>
					<Container>
						<RootScreen />
					</Container>
				</ThemeProvider>
			</ApolloProvider>
		</SafeAreaProvider>
	);
}