import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import ConfirmAddressScreen from '../pages/ConfirmAddress';
import PickLocationScreen from '../pages/PickLocation';
import SearchAddressScreen from '../pages/SearchAddress';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator
			initialRouteName='SearchAddressScreen'
			headerMode='none'
		>
			<Stack.Screen name='SearchAddressScreen' component={SearchAddressScreen} />
			<Stack.Screen name='PickLocationScreen' component={PickLocationScreen} initialParams={{ headerTransparent: true }} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
			<Stack.Screen name='ConfirmAddressScreen' component={ConfirmAddressScreen} />
		</Stack.Navigator>
	);
}
