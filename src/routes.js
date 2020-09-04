import React, { useRef, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native'

import 'moment/locale/pt-br';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

import ConnectionInfoPanel from './components/ConnectionInfoPanel';
import FontLoader from './components/FontLoader';
import Header from './components/Header';
import TabBar from './components/TabBar';

import { useLoggedUserId } from './controller/hooks';
import { receiveNotificationHandler, responseReceiveNotificationHandler } from './controller/notification';
import Cart from './pages/Cart';
import Company from './pages/Company';
import OrdersRoll from './pages/CompanyOrdersRoll';
import Deliveries from './pages/Deliveries';
import Feed from './pages/Feed';
import ForgotPassword from './pages/ForgotPassword';
import ListDeliveries from './pages/ListDeliveries';
import Login from './pages/Login';
import Map from './pages/Map';
import NewAddress from './pages/NewAddress';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import Payment from './pages/Payment';
import Product from './pages/Product';
import Profile from './pages/Profile';
import ProfileTabs from './pages/ProfileTabs';
import Search from './pages/Search';
import SectionCompanies from './pages/SectionCompanies';
import SelectAddress from './pages/SelectAddress';
import SplashLogin from './pages/SplashLogin';
import Subscription from './pages/Subscription';
import SuggestCompany from './pages/SuggestCompany';
import TypeAddress from './pages/TypeAddressStep';
import { useTheme } from './react-native-ui';
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
	const loggedUserId = useLoggedUserId();
	const { palette } = useTheme();
	const [navigationRef, setNavigationRef] = useState(null);

	function handleReceiveListener(notification) {
		receiveNotificationHandler(notification, rootNavigation.current)
	}
	function handleResponseListener(notification) {
		responseReceiveNotificationHandler(notification, rootNavigation.current)
	}

	useEffect(()=>{
		if (!loggedUserId) return;

		const receiveNotificationListener = Notifications.addNotificationReceivedListener(handleReceiveListener);
		const responseNotificationListener = Notifications.addNotificationResponseReceivedListener(handleResponseListener);
		return ()=> {
			receiveNotificationListener.remove();
			responseNotificationListener.remove();
		}
	}, [loggedUserId])

	function handleStateChange () {
		setNavigationRef(rootNavigation.current);
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<FontLoader>
				<NavigationContainer onReady={handleStateChange} ref={rootNavigation} theme={NavigatorTheme}>
					<Stack.Navigator
						initialRouteName='SplashLoginScreen'
						screenOptions={{ header: Header }}
						headerMode='screen'
						mode='card'
					>
						<Stack.Screen name='SplashLoginScreen' component={SplashLogin} options={{ cardStyle: { backgroundColor: palette.primary.main }, headerShown: false, tabBar: false }} />

						<Stack.Screen name='LoginScreen' component={Login} options={{ headerShown: false, tabBar: false }} />
						<Stack.Screen name='SubscriptionScreen' component={Subscription} options={{ headerShown: false, tabBar: false }} />
						<Stack.Screen name='ForgotPasswordScreen' component={ForgotPassword} options={{ tabBar: false }} />

						<Stack.Screen name='FeedScreen' component={Feed} options={{ showBackButton: false, selectedMenu: 'Home' }} />
						<Stack.Screen name='SearchScreen' component={Search} />
						<Stack.Screen name='SectionCompaniesScreen' component={SectionCompanies} />
						<Stack.Screen name='CompanyScreen' component={Company} options={{ headerTransparent: true }} />
						<Stack.Screen name='ProductScreen' component={Product} options={{ headerTransparent: true }} />
						<Stack.Screen name='SuggestCompany' component={SuggestCompany} />
				
						<Stack.Screen name='ProfileScreen' component={Profile} />
						<Stack.Screen name='ProfileTabsScreen' component={ProfileTabs} />
						<Stack.Screen name='OrdersRollScreen' component={OrdersRoll} />
						<Stack.Screen name='DeliveriesScreen' component={Deliveries} />
						<Stack.Screen name='ListDeliveriesScreen' component={ListDeliveries} />
				
						<Stack.Screen name='CartScreen' component={Cart} options={{ selectedMenu: 'Cart' }} />
						<Stack.Screen name='PaymentScreen' component={Payment} options={{ selectedMenu: 'Cart' }}  />

						<Stack.Screen name='OrderListScreen' component={OrderList} options={{ selectedMenu: 'Order' }} />
						<Stack.Screen name='OrderScreen' component={Order} options={{ selectedMenu: 'Order' }} />

						<Stack.Screen options={{ headerShown: true }} name='SelectAddressScreen' component={SelectAddress} />
						<Stack.Screen name='NewAddressScreen' component={NewAddress} options={{ headerShown: false }}  />
						<Stack.Screen name='MapScreen' component={Map} options={{ headerShown: false, tabBar: false }} />
						<Stack.Screen name='TypeAddressScreen' component={TypeAddress} options={{ headerShown: false, tabBar: false }} />
					</Stack.Navigator>
				</NavigationContainer>
				<TabBar navigation={navigationRef} />
				<ConnectionInfoPanel />
			</FontLoader>
		</KeyboardAvoidingView>
	);
}