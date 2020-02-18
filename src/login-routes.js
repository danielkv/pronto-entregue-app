import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './pages/Login';
import SubscriptionScreen from './pages/Subscription';
import { useTheme } from './react-native-ui';

const Stack = createStackNavigator();

export default function Routes() {
	const theme = useTheme();
	return (
		<Stack.Navigator
			initialRouteName='LoginScreen'
			mode='card'
			headerMode='none'
			screenOptions={{ cardStyle: { backgroundColor: theme.palette.tertiary } }}
		>
			<Stack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'Login' }} />
			<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} options={{ title: 'Cadastrar' }} />
		</Stack.Navigator>
	);
}
