import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import TabBar from '../components/TabBar';

import CartScreen from '../pages/Cart';
import PaymentScreen from '../pages/Payment';
import { useSelectedAddress } from '../utils/hooks';

const Stack = createStackNavigator();

export default function CartRoutes() {
	const selectedAddress = useSelectedAddress();

	return (
		<>
			<Stack.Navigator
				initialRouteName='CartScreen'
				headerMode='screen'
				screenOptions= {{ header: Header }}
			>
				<Stack.Screen name='CartScreen' component={CartScreen} />
				<Stack.Screen name='PaymentScreen' component={PaymentScreen} />
			</Stack.Navigator>

			{selectedAddress && <TabBar />}
		</>
	);
}
