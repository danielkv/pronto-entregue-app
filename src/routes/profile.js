import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import TabBar from '../components/TabBar';

import { useSelectedAddress } from '../controller/hooks';
import OrdersRollScreen from '../pages/CompanyOrdersRoll';
import FavoriteProductsScreen from '../pages/FavoriteProducts';
import ProfileScreen from '../pages/Profile';
import SubscriptionScreen from '../pages/Subscription';

const Stack = createStackNavigator();

export default function ProfileRoutes() {
	const selectedAddress = useSelectedAddress();
	return (
		<>
			<Stack.Navigator
				initialRouteName='ProfileScreen'
				headerMode='screen'
				screenOptions={{ header: Header }}
			>
				<Stack.Screen name='ProfileScreen' component={ProfileScreen} />
				<Stack.Screen name='FavoriteProductsScreen' component={FavoriteProductsScreen} />
				<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
				<Stack.Screen name='OrdersRollScreen' component={OrdersRollScreen} />
			</Stack.Navigator>

			{selectedAddress && <TabBar />}
		</>
	);
}
