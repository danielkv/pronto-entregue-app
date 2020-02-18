import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ForgotPasswordScreen from './pages/ForgotPassword';
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
			screenOptions={{ cardStyle: { backgroundColor: theme.palette.background.main } }}
		>
			<Stack.Screen name='LoginScreen' component={LoginScreen} />
			<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
			<Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
		</Stack.Navigator>
	);
}
