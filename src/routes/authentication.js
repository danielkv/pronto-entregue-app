import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import ForgotPasswordScreen from '../pages/ForgotPassword';
import LoginScreen from '../pages/Login';
import SubscriptionScreen from '../pages/Subscription';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator
			initialRouteName='LoginScreen'
			headerMode='none'
		>
			<Stack.Screen name='LoginScreen' component={LoginScreen} />
			<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
			<Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
		</Stack.Navigator>
	);
}
