import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';


import Header from '../components/Header';

import ConfirmAddressScreen from '../pages/ConfirmAddress';
import PickLocationScreen from '../pages/PickLocation';
import SearchAddressScreen from '../pages/SearchAddress';

const Stack = createStackNavigator();

export default function Routes({ init=false }) {
	return (
		<View style={{ flex: 1, marginTop: (init ? Constants.statusBarHeight : 0) + 35 }}>
			<Stack.Navigator
				initialRouteName='InitialAddressScreen'
				headerMode={init? 'none' : 'screen'}
				screenOptions={{ header: Header, searchProductsIcon: false }}
			>
				<Stack.Screen name='SearchAddressScreen' component={SearchAddressScreen} />
				<Stack.Screen name='PickLocationScreen' component={PickLocationScreen} options={{ headerTransparent: true }} />
				<Stack.Screen name='ConfirmAddressScreen' component={ConfirmAddressScreen} />
			</Stack.Navigator>
		</View>
	);
}
