import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import header from './components/header';
import theme from './theme';
import DrawerContent from './components/drawerContent';

import HomeScreen from './pages/Home';
import CategoryScreen from './pages/Category';
import ProductScreen from './pages/Product';

import LoginScreen from './pages/Login';
import SubscriptionScreen from './pages/Subscription';

import CartScreen from './pages/Cart';
import PaymentScreen from './pages/Payment';

import OrderListScreen from './pages/OrderList';
import OrderScreen from './pages/Order';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator contentComponent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name='Pages'>
				{()=>(
					<Stack.Navigator
						initialRouteName='HomeScreen'
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
						<Stack.Screen name='OrderScreen' component={OrderScreen} options={{ title: 'Pedido' }} />
					</Stack.Navigator>
				)}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
}
