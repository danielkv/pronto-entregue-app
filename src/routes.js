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
import SubscriptionScreen from './pages/subscription';

import CartScreen from './pages/cart';
import PaymentScreen from './pages/payment';

import OrderListScreen from './pages/orderList';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator contentComponent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name='Pages'>
				{()=>(
					<Stack.Navigator
						initialRouteName='OrderListScreen'
						screenOptions={{ header, headerTransparent: true, cardStyle: { backgroundColor: theme.colors.primary } }}
					>
						<Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: '' }} />
						<Stack.Screen name='CategoryScreen' component={CategoryScreen} options={{ title: 'Produtos' }} />
						<Stack.Screen name='ProductScreen' component={ProductScreen} options={{ title: 'Produto' }} />
						
						<Stack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'Login' }} />
						<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} options={{ title: 'Cadastrar' }} />
						
						<Stack.Screen name='CartScreen' component={CartScreen} options={{ title: 'Carrinho' }} />
						<Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{ title: 'Pagamento' }} />
						
						<Stack.Screen name='OrderListScreen' component={OrderListScreen} options={{ title: 'Pedidos' }} />
					</Stack.Navigator>
				)}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
}
