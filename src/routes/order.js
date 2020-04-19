import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import TabBar from '../components/TabBar';

import { useSelectedAddress } from '../controller/hooks';
import OrderScreen from '../pages/Order';
import OrderListScreen from '../pages/OrderList';

const Stack = createStackNavigator();

export default function OrderRoutes() {
	const selectedAddress = useSelectedAddress();
	return (
		<>
			<Stack.Navigator
				initialRouteName='OrderScreen'
				headerMode='screen'
				screenOptions= {{ header: Header }}
			>
				<Stack.Screen name='OrderListScreen' component={OrderListScreen} />
				<Stack.Screen name='OrderScreen' component={OrderScreen} />
			</Stack.Navigator>
			{selectedAddress && <TabBar />}
		</>
	);
}
