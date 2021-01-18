import 'moment/locale/pt-br';
import React, { useRef, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native'
import Modal from 'react-native-modal';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';

import ConnectionInfoPanel from './components/ConnectionInfoPanel';
import FontLoader from './components/FontLoader';
import BackButton from './components/NewHeader/BackButton';
import UserAvatar from './components/NewHeader/UserAvatar';
import SearchButton from './components/SearchButton';
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
import MakePayment from './pages/MakePayment';
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
import { Paper, Typography, Button, useTheme } from './react-native-ui';
import { headerTheme } from './theme/header';
import NavigatorTheme from './theme/navigator';



//const Stack = createStackNavigator();
enableScreens();
const Stack = createNativeStackNavigator();

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

	const datelimit = moment('2021-01-22 23:59:59');
	const [popUpVisible, setPopUpVisible] = useState(()=>moment().isSameOrBefore(datelimit));
	const [lastPopUpVisible, setLastPopUpVisible] = useState(()=>moment().isAfter(datelimit));

	function handleReceiveListener(notification) {
		receiveNotificationHandler(notification, rootNavigation.current)
	}
	function handleResponseListener(notification) {
		responseReceiveNotificationHandler(notification, rootNavigation.current)
	}

	useEffect(() => {
		if (!loggedUserId) return;

		const receiveNotificationListener = Notifications.addNotificationReceivedListener(handleReceiveListener);
		const responseNotificationListener = Notifications.addNotificationResponseReceivedListener(handleResponseListener);
		return () => {
			receiveNotificationListener.remove();
			responseNotificationListener.remove();
		}
	}, [loggedUserId])

	function handleStateChange() {
		setNavigationRef(rootNavigation.current);
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<FontLoader>
				<Modal isVisible={popUpVisible}>
					<Paper>
						<Typography variant='title' style={{ marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Aviso importante!</Typography>
						<Typography variant='text' style={{ fontSize: 16, marginBottom: 10 }}>Oi. Venho comunicar uma triste decisão 😥.{'\n\n'}O app <Text style={{ fontFamily: 'Roboto-Bold' }}>Pronto, Entregue</Text>, infelizmente irá desativar seus serviços a partir de 22/01/2021. Não foi uma decisão fácil, mas foi necessária. Alguns eventos nos últimos meses nos levaram a dar um passo pra trás e avaliar nosso modelo de negócio.</Typography>

						<Typography variant='text'  style={{ fontSize: 16, marginBottom: 10 }}>Esperamos que isso não seja um adeus e sim um até logo! Acreditamos que nossa ausência será breve.{'\n\n'}Até mais, equipe <Text style={{ fontFamily: 'Roboto-Bold' }}>Pronto, Entregue!</Text></Typography>
						<Button variant='filled' color='primary' onPress={()=>{setPopUpVisible(false)}}>Fechar</Button>
					</Paper>
				</Modal>
				
				<Modal isVisible={lastPopUpVisible}>
					<Paper>
						<Typography variant='title' style={{ marginBottom: 10, fontFamily: 'Roboto-Bold' }}>Aviso importante!</Typography>
						<Typography variant='text' style={{ fontSize: 16, marginBottom: 10 }}>Infelizmente não estamos mais aceitando pedidos 😭. Esperamos que não seja um adeus e sim um até logo!</Typography>
					</Paper>
				</Modal>
				<StatusBar style='dark' />

				{!lastPopUpVisible && <>
					<NavigationContainer onReady={handleStateChange} ref={rootNavigation} theme={NavigatorTheme}>
						<Stack.Navigator
							initialRouteName='SplashLoginScreen'
							screenOptions={({ navigation }) => ({
							...headerTheme,
							headerRight: () => (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<SearchButton navigation={navigation} />
								<UserAvatar navigation={navigation} />
							</View>),
							headerLeft: () => (<BackButton navigation={navigation} />)
						})}

					>
							<Stack.Screen name='SplashLoginScreen' component={SplashLogin} options={{ cardStyle: { backgroundColor: palette.primary.main }, headerShown: false, tabBar: false }} />

							<Stack.Screen name='LoginScreen' component={Login} options={{ headerShown: false, tabBar: false }} />
							<Stack.Screen name='SubscriptionScreen' component={Subscription} options={{ headerShown: false, tabBar: false }} />
							<Stack.Screen name='ForgotPasswordScreen' component={ForgotPassword} options={{ tabBar: false }} />

							<Stack.Screen name='FeedScreen' component={Feed} options={{ showBackButton: false, selectedMenu: 'Home' }} />
							<Stack.Screen name='SearchScreen' component={Search} />
							<Stack.Screen name='SectionCompaniesScreen' component={SectionCompanies} />
							<Stack.Screen name='CompanyScreen' component={Company} options={{ headerShown: false }} />
							<Stack.Screen name='ProductScreen' component={Product} options={{ headerShown: false }} />
							<Stack.Screen name='SuggestCompany' component={SuggestCompany} />

							<Stack.Screen name='ProfileScreen' component={Profile} />
							<Stack.Screen name='ProfileTabsScreen' component={ProfileTabs} />
							<Stack.Screen name='OrdersRollScreen' component={OrdersRoll} />
							<Stack.Screen name='DeliveriesScreen' component={Deliveries} />
							<Stack.Screen name='ListDeliveriesScreen' component={ListDeliveries} />

							<Stack.Screen name='CartScreen' component={Cart} options={{ selectedMenu: 'Cart' }} />
							<Stack.Screen name='PaymentScreen' component={Payment} options={{ selectedMenu: 'Cart' }} />
							<Stack.Screen name='MakePaymentScreen' component={MakePayment} options={{ selectedMenu: 'Cart' }} />

							<Stack.Screen name='OrderListScreen' component={OrderList} options={{ selectedMenu: 'Order' }} />
							<Stack.Screen name='OrderScreen' component={Order} options={{ selectedMenu: 'Order' }} />

							<Stack.Screen options={{ headerShown: true }} name='SelectAddressScreen' component={SelectAddress} />
							<Stack.Screen name='NewAddressScreen' component={NewAddress} options={{ headerShown: false }} />
							<Stack.Screen name='MapScreen' component={Map} options={{ headerShown: false, tabBar: false }} />
							<Stack.Screen name='TypeAddressScreen' component={TypeAddress} options={{ headerShown: false, tabBar: false }} />
						</Stack.Navigator>
					</NavigationContainer>
					<TabBar navigation={navigationRef} />
					<ConnectionInfoPanel />
				</>}
			</FontLoader>
		</KeyboardAvoidingView>
	);
}