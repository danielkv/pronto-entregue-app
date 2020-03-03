import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TabBar from '../components/TabBar';

import CategoryScreen from '../pages/Category';
import FeedScreen from '../pages/Feed';
import ProductScreen from '../pages/Product';
import SearchScreen from '../pages/Search';
import { useSelectedAddress } from '../utils/hooks';

const Stack = createStackNavigator();

export default function HomeRoutes() {
	const selectedAddress = useSelectedAddress();
	return (
		<>
			<Stack.Navigator
				initialRouteName='SearchScreen'
				headerMode='none'
			>
				<Stack.Screen name='FeedScreen' component={FeedScreen} />
				<Stack.Screen name='SearchScreen' component={SearchScreen} />
				<Stack.Screen name='CategoryScreen' component={CategoryScreen} />
				<Stack.Screen name='ProductScreen' component={ProductScreen} />
			</Stack.Navigator>
		
			{selectedAddress && <TabBar />}
		</>
	);
}
