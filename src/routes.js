import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import header from './components/header';
import theme from './theme';

import HomeScreen from './pages/home';
import CategoryScreen from './pages/category';
import ProductScreen from './pages/product';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name='Pages'>
				{()=>(
					<Stack.Navigator
						initialRouteName='HomeScreen'
						screenOptions={{ header, headerTransparent: true, cardStyle: { backgroundColor: theme.colors.primary } }}
					>
						<Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: '' }} />
						<Stack.Screen name='CategoryScreen' component={CategoryScreen} options={{ title: 'Produtos' }} />
						<Stack.Screen name='ProductScreen' component={ProductScreen} options={{ title: 'Produto' }} />
					</Stack.Navigator>
				)}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
}
