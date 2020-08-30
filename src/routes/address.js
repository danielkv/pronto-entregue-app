import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import MapScreen from '../pages/Map';
import NewAddressScreen from '../pages/NewAddress';
import SelectAddressScreen from '../pages/SelectAddress';
import TypeAddressScreen from '../pages/TypeAddressStep';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator
			initialRouteName='InitialAddressScreen'
			headerMode='screen'
			screenOptions={{ headerShown: false, header: Header, searchProductsIcon: false }}
		>
			<Stack.Screen options={{ headerShown: true }} name='SelectAddressScreen' component={SelectAddressScreen} />
			<Stack.Screen  name='NewAddressScreen' component={NewAddressScreen}  />
			<Stack.Screen name='MapScreen' component={MapScreen} />
			<Stack.Screen name='TypeAddressScreen' component={TypeAddressScreen} />
		</Stack.Navigator>
		
	);
}
