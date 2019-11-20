import React from 'react';
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useInitialize } from './services/init';
import SplashScreen from './pages/SplashScreen';
import RootScreen from './routes';
import theme from './theme';

const Stack = createStackNavigator();

export default function RootRoutes() {
	const { loading, selectedBranch } = useInitialize();
	const insets = useSafeArea();
	
	return (
		<View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
			<NavigationNativeContainer>
				<Stack.Navigator headerMode='none' screenOptions={{ cardStyle: { backgroundColor: theme.colors.primary } }}>
					{!selectedBranch
						? <Stack.Screen loadingRoot={loading} name='SplashScreen' component={SplashScreen} />
						: <Stack.Screen name='RootScreen' component={RootScreen} />}
				</Stack.Navigator>
			</NavigationNativeContainer>
		</View>
	);
}