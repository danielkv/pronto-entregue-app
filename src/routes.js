import React, { useRef, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native'

import 'moment/locale/pt-br';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

import ConnectionInfoPanel from './components/ConnectionInfoPanel';
import FontLoader from './components/FontLoader';

import { receiveNotificationHandler, responseReceiveNotificationHandler } from './controller/notification';
import AddressRoutes from './routes/address';
import AuthenticationRoutes from './routes/authentication';
import CartRoutes from './routes/cart';
import HomeRoutes from './routes/home';
import OrderRoutes from './routes/order';
import ProfileRoutes from './routes/profile';
import WelcomeRoutes from './routes/welcome';
import NavigatorTheme from './theme/navigator';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: false,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function SplashScreen() {
	const rootNavigation = useRef(null);

	function handleReceiveListener(notification) {
		receiveNotificationHandler(notification, rootNavigation.current)
	}
	function handleResponseListener(notification) {
		responseReceiveNotificationHandler(notification, rootNavigation.current)
	}

	useEffect(()=>{
		const receiveNotificationListener = Notifications.addNotificationReceivedListener(handleReceiveListener);
		const responseNotificationListener = Notifications.addNotificationResponseReceivedListener(handleResponseListener);
		return ()=> {
			receiveNotificationListener.remove();
			responseNotificationListener.remove();
		}
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
						<Stack.Screen name='AddressRoutes' component={AddressRoutes} />
					</Stack.Navigator>
				</NavigationContainer>
				<ConnectionInfoPanel />
			</FontLoader>
		</KeyboardAvoidingView>
	);
}