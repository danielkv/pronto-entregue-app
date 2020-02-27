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
			initialRouteName='LoginScreen'
			screenOptions={{ header: Header }}
		>
			<Stack.Screen name='SearchAddressScreen' component={SearchAddressScreen} />
			<Stack.Screen name='PickLocationScreen' component={PickLocationScreen} options={{ header: (props) => <Header {...props} variant='transparent' />,  headerTransparent: true, ...TransitionPresets.ModalSlideFromBottomIOS }} />
			<Stack.Screen name='ConfirmAddressScreen' component={ConfirmAddressScreen} />
		</Stack.Navigator>
	);
}
