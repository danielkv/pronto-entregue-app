import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import ConfirmAddressScreen from '../pages/ConfirmAddress';
import NewAddressScreen from '../pages/NewAddress';
import PickLocationScreen from '../pages/PickLocation';
import SelectAddressScreen from '../pages/SelectAddress';

const Stack = createStackNavigator();

export default function Routes({ init=false }) {
	return (
		<Stack.Navigator
			initialRouteName='InitialAddressScreen'
			headerMode='none'
			screenOptions={{ header: Header, searchProductsIcon: false }}
		>
			<Stack.Screen name='SelectAddressScreen' component={SelectAddressScreen} />
			<Stack.Screen name='NewAddressScreen' component={NewAddressScreen} options={{ headerMode: 'none' }} />
			<Stack.Screen name='PickLocationScreen' component={PickLocationScreen} options={{ headerTransparent: true }} />
			<Stack.Screen name='ConfirmAddressScreen' component={ConfirmAddressScreen} />
		</Stack.Navigator>
		
	);
}
