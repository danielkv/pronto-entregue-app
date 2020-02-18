import React from 'react';
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import LoadingBlock from './components/LoadingBlock';

import AppRoutes from './app-routes';
import LoginRoutes from './login-routes';
import { useInitialize } from './services/init';

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
						: !loggedUserId ? <LoginRoutes /> : <AppRoutes />
				}
			</NavigationContainer>
		</View>
	);
}