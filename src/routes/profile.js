import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import TabBar from '../components/TabBar';

import FavoriteProductsScreen from '../pages/FavoriteProducts';
import ProfileScreen from '../pages/Profile';
import SubscriptionScreen from '../pages/Subscription';
import { useSelectedAddress } from '../utils/hooks';

const Stack = createStackNavigator();

export default function ProfileRoutes() {
	const selectedAddress = useSelectedAddress();
	return (
		<>
			<Stack.Navigator
				initialRouteName='ProfileScreen'
				screenOptions={{ header: Header }}
			>
				<Stack.Screen name='ProfileScreen' component={ProfileScreen} />
				<Stack.Screen name='FavoriteProductsScreen' component={FavoriteProductsScreen} />
				<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
			</Stack.Navigator>

			{selectedAddress && <TabBar />}
		</>
	);
}
