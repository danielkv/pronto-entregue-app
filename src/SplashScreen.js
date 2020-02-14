import React from 'react';
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useInitialize } from './services/init';
import Routes from './routes';
import LoadingBlock from './components/LoadingBlock';
import Login from './pages/Login';

export default function SplashScreen() {
	const { loading, loggedUserId } = useInitialize();
	const insets = useSafeArea();
	
	return (
		<View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
			<NavigationContainer>
				{
					// eslint-disable-next-line no-nested-ternary
					loading
						? <LoadingBlock />
						: !loggedUserId ? <Login /> : <Routes />
				}
			</NavigationContainer>
		</View>
	);
}