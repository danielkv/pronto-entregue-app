import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerContent from './components/DrawerContent';
import header from './components/Header';

import AddressListScreen from './pages/AddressList';
import CartScreen from './pages/Cart';
import CategoryScreen from './pages/Category';
import CreateAddressScreen from './pages/CreateAddress';
import HomeScreen from './pages/Home';
import OrderScreen from './pages/Order';
import OrderListScreen from './pages/OrderList';
import PaymentScreen from './pages/Payment';
import ProductScreen from './pages/Product';
import ProfileScreen from './pages/Profile';
import SubscriptionScreen from './pages/Subscription';
import { useTheme } from './react-native-ui';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
	const theme = useTheme();
	
	return (
		<Drawer.Navigator contentComponent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name='Pages'>
				{()=>(
					<Stack.Navigator
						initialRouteName='HomeScreen'
						mode='card'
						headerMode='screen'
						screenOptions={{ header, cardStyle: { backgroundColor: theme.palette.tertiary } }}
					>
						<Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: '' }} />
						<Stack.Screen name='CategoryScreen' component={CategoryScreen} options={{ title: 'Produtos' }} />
						<Stack.Screen name='ProductScreen' component={ProductScreen} options={{ title: 'Produto' }} />

						<Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
						
						<Stack.Screen name='CartScreen' component={CartScreen} options={{ title: 'Carrinho' }} />
						<Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{ title: 'Pagamento' }} />
						
						<Stack.Screen name='OrderListScreen' component={OrderListScreen} options={{ title: 'Pedidos' }} />
						<Stack.Screen name='OrderScreen' component={OrderScreen} options={{ title: 'Pedido' }} />
						
						<Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{ title: 'Meus Dados' }} />
						<Stack.Screen name='AddressListScreen' component={AddressListScreen} options={{ title: 'Meus Endereços' }} />
						<Stack.Screen name='CreateAddressScreen' component={CreateAddressScreen} options={{ title: 'Adicionar Endereço' }} />
					</Stack.Navigator>
				)}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
}
