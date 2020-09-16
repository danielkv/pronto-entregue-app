import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashLoginScreen from '../pages/SplashLogin';

const Stack = createStackNavigator();

export default function AppRoutes() {
	return (
		<Stack.Navigator
			headerMode='none'
			mode='card'
		>
			<Stack.Screen name='SplashLoginScreen' component={SplashLoginScreen} />
		</Stack.Navigator>
	);
}
