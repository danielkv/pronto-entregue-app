import React from 'react';
import { ScrollView } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTheme, Icon } from '../../react-native-ui';
import CreditHistoryScreen from '../CreditHistory';
import FavoriteProductsScreen from '../FavoriteProducts';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
	const { palette } = useTheme();

	return (
		<Tab.Navigator
			initialRouteName='OrderListScreen'
			sceneContainerStyle={{
				backgroundColor: 'transparent',
				overflow: 'visible',
				marginTop: 35
			}}
			tabBarOptions={{
				showIcon: true,
				activeTintColor: palette.primary.main,
				inactiveTintColor: '#D1C6B1',
				scrollEnabled: true,
				iconStyle: { width: 35, alignItems: 'center', marginTop: -5 },
				labelStyle: { fontWeight: 'bold', textTransform: 'capitalize', fontSize: 18, },
				style: { elevation: 0, backgroundColor: 'transparent' },
				tabStyle: { width: 'auto', flexDirection: 'row', alignItems: 'center' },
				indicatorStyle: { backgroundColor: palette.primary.main, height: 3 }
			}}
		>
			<Tab.Screen name='FavoriteProductsScreen' options={{ title: 'Produtos Favoritos', tabBarIcon: ({ color })=><Icon color={color} name='heart' /> }} component={FavoriteProductsScreen} />
			<Tab.Screen name='CreditHistory' options={{ title: 'Créditos', tabBarIcon: ({ color })=><Icon color={color} name='dollar-sign' /> }} component={CreditHistoryScreen} />
		</Tab.Navigator>

	);
}
