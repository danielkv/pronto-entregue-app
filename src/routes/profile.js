import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import ProfileScreen from '../pages/Profile';
import SubscriptionScreen from '../pages/Subscription';

const Stack = createStackNavigator();

export default function ProfileRoutes() {
	return (
		<Stack.Navigator
			initialRouteName='ProfileScreen'
			screenOptions={{ header: Header }}
		>
			<Stack.Screen name='ProfileScreen' component={ProfileScreen} />
			<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
		</Stack.Navigator>
	);
}
