import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LocationAccessScreen from '../pages/LocationAccess';
import SplashLoginScreen from '../pages/SplashLogin';

const Stack = createStackNavigator();

export default function AppRoutes() {
	return (
		<Stack.Navigator
			initialRouteName='LocationAccessScreen'
			headerMode='none'
			mode='card'
		>
			<Stack.Screen name='LocationAccessScreen' component={LocationAccessScreen} />
			<Stack.Screen name='SplashLoginScreen' component={SplashLoginScreen} />
		</Stack.Navigator>
	);
}
