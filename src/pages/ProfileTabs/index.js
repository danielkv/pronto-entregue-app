import React from 'react';
import { ScrollView } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTheme, Icon } from '../../react-native-ui';
import FavoriteProducts from '../FavoriteProducts';
import OrderListScreen from '../OrderList';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
	const { palette } = useTheme();

	return (
		<ScrollView style={{ flex: .5 }}>
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
					tabStyle: { padding: 0, flexDirection: 'row', alignItems: 'center' },
					indicatorStyle: { backgroundColor: palette.primary.main, height: 3 }
				}}
			>
				<Tab.Screen name='FavoriteProductsScreen' options={{ title: 'Favoritos', tabBarIcon: ({ color })=><Icon color={color} name='heart' /> }} component={FavoriteProducts} />
			</Tab.Navigator>
		</ScrollView>
	);
}
