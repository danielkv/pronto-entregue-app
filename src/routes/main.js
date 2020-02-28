import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import ProfileRoutes from '../pages/Profile';
import { useSelectedAddress } from '../utils/hooks';
import CartRoutes from './cart';
import HomeRoutes from './home';
import OrderRoutes from './order';
import SelectAddressScreen from './selectAddress';

const Stack = createStackNavigator();

export default function AppRoutes() {
	const selectedAddress = useSelectedAddress();
	
	return (
		<>
			<Stack.Navigator
				backBehavior='history'
				initialRouteName='HomeScreen'
				screenOptions={({ route })=>{
					const actualRoute = route?.state?.routes[route.state.index] || route;
					return {
						headerTransparent: actualRoute.params?.headerTransparent || false,
						header: Header
					}
				}}>
				{selectedAddress && (
					<>
						<Stack.Screen name='HomeRoutes' component={HomeRoutes} />
						<Stack.Screen name='ProfileRoutes' component={ProfileRoutes} />
						<Stack.Screen name='CartRoutes' component={CartRoutes} />
						<Stack.Screen name='OrderRoutes' component={OrderRoutes} />
					</>
				)}

				<Stack.Screen name='SelectAddressScreen' component={SelectAddressScreen} />
			</Stack.Navigator>
		</>
	);
}
