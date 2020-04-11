import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import AskLoginScreen from '../pages/AskLogin';
import LocationAccessScreen from '../pages/LocationAccess';

const Stack = createStackNavigator();

export default function AppRoutes() {
	return (
		<Stack.Navigator
			initialRouteName='AskLoginScreen'
			screenOptions={{ header: Header, headerTransparent: true, searchProductsIcon: false }}
			mode='card'
		>
			<Stack.Screen name='LocationAccessScreen' component={LocationAccessScreen} />
			<Stack.Screen name='AskLoginScreen' component={AskLoginScreen} />
		</Stack.Navigator>
	);
}
