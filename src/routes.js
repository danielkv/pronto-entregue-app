import React from 'react';
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import LoadingBlock from './components/LoadingBlock';

import AuthenticationRoutes from './routes/authentication';
import MainRoutes from './routes/main';
import { useInitialize } from './services/init';
import NavigatorTheme from './theme/navigator';

export default function SplashScreen() {
	const { loading, loggedUserId } = useInitialize();
	const insets = useSafeArea();

	return (
		<View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
			<NavigationContainer theme={NavigatorTheme}>
				{
					// eslint-disable-next-line no-nested-ternary
					loading
						? <LoadingBlock />
						: !loggedUserId
							? <AuthenticationRoutes />
							: <MainRoutes />
				}
			</NavigationContainer>
		</View>
	);
}