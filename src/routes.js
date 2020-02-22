import React from 'react';
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingBlock from './components/LoadingBlock';

import LoginRoutes from './routes/login';
import MainRoutes from './routes/main';
import SelectAddressScreen from './routes/selectAddress';
import { useInitialize } from './services/init';
import NavigatorTheme from './theme/navigator';

const Stack = createStackNavigator();

export default function SplashScreen() {
	const { loading, loggedUserId, selectedAddress } = useInitialize();
	const insets = useSafeArea();

	console.log('selectedAddress: ', selectedAddress);
	
	return (
		<View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
			<NavigationContainer theme={NavigatorTheme}>
				<Stack.Navigator
					initialRouteName='Loading'
					mode='modal'
					
					headerMode='none'
				>
					{
						// eslint-disable-next-line no-nested-ternary
						loading
							? <Stack.Screen name='Loading' component={LoadingBlock} />
							: !loggedUserId
								? <Stack.Screen name='LoginRoutes' component={LoginRoutes} />
								: selectedAddress
									? <Stack.Screen name='AppRoutes' component={MainRoutes} />
									: <Stack.Screen name='SelectAddressScreen' component={SelectAddressScreen} />
					}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}