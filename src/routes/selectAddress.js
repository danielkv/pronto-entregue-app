import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Header from '../components/Header';

import ConfirmAddressScreen from '../pages/ConfirmAddress';
import PickLocationScreen from '../pages/PickLocation';
import SearchAddressScreen from '../pages/SearchAddress';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator
			initialRouteName='SearchAddressScreen'
			headerMode='screen'
			screenOptions={{ header: Header, searchProductsIcon: false }}
		>
			<Stack.Screen name='SearchAddressScreen' component={SearchAddressScreen} />
			<Stack.Screen name='PickLocationScreen' component={PickLocationScreen} options={{ headerTransparent: true/* , ...TransitionPresets.ModalSlideFromBottomIOS */ }} />
			<Stack.Screen name='ConfirmAddressScreen' component={ConfirmAddressScreen} />
		</Stack.Navigator>
	);
}
