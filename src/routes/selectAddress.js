import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import ConfirmAddressScreen from '../pages/ConfirmAddress';
import PickLocationScreen from '../pages/PickLocation';
import SearchAddressScreen from '../pages/SearchAddress';

const Stack = createStackNavigator();

export default function Routes({ init=false }) {
	return (
		<Stack.Navigator
			initialRouteName='InitialAddressScreen'
			headerMode={init? 'none' : 'screen'}
			screenOptions={{ header: Header, searchProductsIcon: false }}
		>
			<Stack.Screen name='SearchAddressScreen' component={SearchAddressScreen} />
			<Stack.Screen name='PickLocationScreen' component={PickLocationScreen} options={{ headerTransparent: true }} />
			<Stack.Screen name='ConfirmAddressScreen' component={ConfirmAddressScreen} />
		</Stack.Navigator>
		
	);
}
