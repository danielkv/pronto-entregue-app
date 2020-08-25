import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import MapScreen from '../pages/Map';
import NewAddressScreen from '../pages/NewAddress';
import SelectAddressScreen from '../pages/SelectAddress';
import TypeAddressScreen from '../pages/TypeAddress';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator
			initialRouteName='InitialAddressScreen'
			headerMode='none'
			screenOptions={{ header: Header, searchProductsIcon: false }}
		>
			<Stack.Screen name='SelectAddressScreen' component={SelectAddressScreen} />
			<Stack.Screen name='NewAddressScreen' component={NewAddressScreen} options={{ headerMode: 'none' }} />
			<Stack.Screen name='MapScreen' component={MapScreen} options={{ headerTransparent: true }} />
			<Stack.Screen name='TypeAddressScreen' component={TypeAddressScreen} />
		</Stack.Navigator>
		
	);
}
