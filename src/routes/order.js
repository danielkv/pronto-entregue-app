import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TabBar from '../components/TabBar';

import OrderScreen from '../pages/Order';
import OrderListScreen from '../pages/OrderList';
import { useSelectedAddress } from '../utils/hooks';

const Stack = createStackNavigator();

export default function OrderRoutes() {
	const selectedAddress = useSelectedAddress();
	return (
		<>
			<Stack.Navigator
				initialRouteName='OrderScreen'
				headerMode='none'
			>
				<Stack.Screen name='OrderScreen' component={OrderScreen} />
				<Stack.Screen name='OrderListScreen' component={OrderListScreen} />
			</Stack.Navigator>
			{selectedAddress && <TabBar />}
		</>
	);
}
