import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useSelectedAddress } from '../utils/hooks';
import CartRoutes from './cart';
import HomeRoutes from './home';
import OrderRoutes from './order';
import ProfileRoutes from './profile';
import SelectAddressScreen from './selectAddress';

const Stack = createStackNavigator();

export default function AppRoutes() {
	const selectedAddress = useSelectedAddress();
	
	return (
		<>
			<Stack.Navigator
				initialRouteName='HomeScreen'
				headerMode='none'
				mode='card'
				/* screenOptions={({ route })=>{
					const actualRoute = route?.state?.routes[route.state.index] || route;
					return {
						//headerMode: 'none',
						headerTransparent: actualRoute.params?.headerTransparent || false,
						//header: Header
					}
				}} */
			>
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
