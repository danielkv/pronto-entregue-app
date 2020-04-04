import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import TabBar from '../components/TabBar';

import CompanyScreen from '../pages/Company';
import FeedScreen from '../pages/Feed';
import ProductScreen from '../pages/Product';
import SearchScreen from '../pages/Search';
import SectionCompaniesScreen from '../pages/SectionCompanies';
import { useSelectedAddress } from '../utils/hooks';

const Stack = createStackNavigator();

export default function HomeRoutes() {
	const selectedAddress = useSelectedAddress();
	return (
		<>
			<Stack.Navigator
				initialRouteName='FeedScreen'
				headerMode='screen'
				screenOptions={{ header: Header }}
			>
				<Stack.Screen name='FeedScreen' component={FeedScreen} options={{ showBackButton: false }} />
				<Stack.Screen name='SearchScreen' component={SearchScreen} />
				<Stack.Screen name='SectionCompaniesScreen' component={SectionCompaniesScreen} />
				<Stack.Screen name='CompanyScreen' component={CompanyScreen} options={{ headerTransparent: true }} />
				<Stack.Screen name='ProductScreen' component={ProductScreen} options={{ headerTransparent: true }} />
			</Stack.Navigator>
		
			{selectedAddress && <TabBar />}
		</>
	);
}
