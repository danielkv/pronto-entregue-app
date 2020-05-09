import React, { useRef, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native'

import 'moment/locale/pt-br';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from 'expo';

import ConnectionInfoPanel from './components/ConnectionInfoPanel';
import FontLoader from './components/FontLoader';

import { handleNotificationListener } from './controller/notification';
import AuthenticationRoutes from './routes/authentication';
import CartRoutes from './routes/cart';
import HomeRoutes from './routes/home';
import OrderRoutes from './routes/order';
import ProfileRoutes from './routes/profile';
import SelectAddressRoutes from './routes/selectAddress';
import WelcomeRoutes from './routes/welcome';
import NavigatorTheme from './theme/navigator';

const Stack = createStackNavigator();

export default function SplashScreen() {
	const rootNavigation = useRef(null);

	useEffect(()=>{
		const listener = Notifications.addListener((notification) => handleNotificationListener(notification, rootNavigation.current));
		return ()=> listener.remove();
	}, [])

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<FontLoader>
				<NavigationContainer ref={rootNavigation} theme={NavigatorTheme}>
					<Stack.Navigator
						initialRouteName='WelcomeRoutes'
						headerMode='none'
						mode='card'
					>
						<Stack.Screen name='WelcomeRoutes' component={WelcomeRoutes} />
						<Stack.Screen name='HomeRoutes' component={HomeRoutes} />
						<Stack.Screen name='ProfileRoutes' component={ProfileRoutes} />
						<Stack.Screen name='CartRoutes' component={CartRoutes} />
						<Stack.Screen name='OrderRoutes' component={OrderRoutes} />
						<Stack.Screen name='AuthenticationRoutes' component={AuthenticationRoutes} />
						<Stack.Screen name='SelectAddressRoutes' component={SelectAddressRoutes} />
					</Stack.Navigator>
								
				</NavigationContainer>
				<ConnectionInfoPanel />
			</FontLoader>
		</KeyboardAvoidingView>
	);
}