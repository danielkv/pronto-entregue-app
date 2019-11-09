import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import header from './components/header';
import theme from './theme';
import DrawerContent from './components/drawerContent';

import HomeScreen from './pages/home';
import CategoryScreen from './pages/category';
import ProductScreen from './pages/product';

import LoginScreen from './pages/login';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator contentComponent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name='Pages'>
				{()=>(
					<Stack.Navigator
						initialRouteName='LoginScreen'
						screenOptions={{ header, headerTransparent: true, cardStyle: { backgroundColor: theme.colors.primary } }}
					>
						<Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: '' }} />
						<Stack.Screen name='CategoryScreen' component={CategoryScreen} options={{ title: 'Produtos' }} />
						<Stack.Screen name='ProductScreen' component={ProductScreen} options={{ title: 'Produto' }} />
						
						<Stack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'Login' }} />
					</Stack.Navigator>
				)}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
}
