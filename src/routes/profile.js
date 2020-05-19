import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import TabBar from '../components/TabBar';

import { useSelectedAddress } from '../controller/hooks';
import OrdersRollScreen from '../pages/CompanyOrdersRoll';
import ProfileScreen from '../pages/Profile';
import ProfileTabsScreen from '../pages/ProfileTabs';
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
				<Stack.Screen name='ProfileTabsScreen' component={ProfileTabsScreen} />
				<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
				<Stack.Screen name='OrdersRollScreen' component={OrdersRollScreen} />
			</Stack.Navigator>

			{selectedAddress && <TabBar />}
		</>
	);
}
