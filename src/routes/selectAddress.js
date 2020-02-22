import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Header from '../components/Header';

import PickLocationScreen from '../pages/PickLocation';
import SearchAddressScreen from '../pages/SearchAddress';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator
			initialRouteName='LoginScreen'
			mode='card'
			screenOptions={{ header: Header, animationTypeForReplace: 'push' }}
		>
			<Stack.Screen name='SearchAddressScreen' component={SearchAddressScreen} />
			<Stack.Screen name='PickLocationScreen' component={PickLocationScreen} options={{ header: (props) => <Header {...props} variant='transparent' />,  headerTransparent: true, ...TransitionPresets.ModalSlideFromBottomIOS }} />
		</Stack.Navigator>
	);
}
