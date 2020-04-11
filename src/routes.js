import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';

import 'moment/locale/pt-br';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConnectionInfoPanel from './components/ConnectionInfoPanel';
import FontLoader from './components/FontLoader';

import AuthenticationRoutes from './routes/authentication';
import CartRoutes from './routes/cart';
import HomeRoutes from './routes/home';
import OrderRoutes from './routes/order';
import ProfileRoutes from './routes/profile';
import SelectAddressScreen from './routes/selectAddress';
import WelcomeRoutes from './routes/welcome';
import NavigatorTheme from './theme/navigator';

const Stack = createStackNavigator();

export default function SplashScreen() {
	const insets = useSafeArea();

	return (
		<View style={{ flex: 1, paddingBottom: insets.bottom }}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
				<FontLoader>
					<NavigationContainer theme={NavigatorTheme}>
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
							<Stack.Screen name='SelectAddressScreen' component={SelectAddressScreen} />
						</Stack.Navigator>
								
					</NavigationContainer>
					<ConnectionInfoPanel />
				</FontLoader>
			</KeyboardAvoidingView>

		</View>
	);
}