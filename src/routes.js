import React from 'react';
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import header from './components/Header';
import LoadingBlock from './components/LoadingBlock';

import AppRoutes from './app-routes';
import LoginRoutes from './login-routes';
import { useInitialize } from './services/init';
import NavigatorTheme from './theme/navigator';

const Stack = createStackNavigator();

export default function SplashScreen() {
	const { loading, loggedUserId } = useInitialize();
	const insets = useSafeArea();
	
	return (
		<View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
			<NavigationContainer theme={NavigatorTheme}>
				<Stack.Navigator
					initialRouteName='HomeScreen'
					mode='card'
					//headerMode='none'
					screenOptions={{ header }}
				>
					{
						// eslint-disable-next-line no-nested-ternary
						loading
							? <Stack.Screen name='Loading' options={{ headerShown: false }} component={LoadingBlock} />
							: !loggedUserId
								? <Stack.Screen name='LoginRoutes' options={{ headerShown: false }} component={LoginRoutes} />
								: <Stack.Screen name='AppRoutes' options={{ headerShown: false }} component={AppRoutes} />
					}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}