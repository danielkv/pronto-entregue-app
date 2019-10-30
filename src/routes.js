import React from 'react';
import {View} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./pages/splashScreen";

const Stack = createStackNavigator();

export default function RootRoutes() {
	const insets = useSafeArea();
	
	return (
		<View style={{flex:1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
			<NavigationNativeContainer>
				<Stack.Navigator headerMode='none' screenOptions={{cardStyle: {backgroundColor: 'transparent'}}}>
					<Stack.Screen name="SplashScreen" component={SplashScreen} />
				</Stack.Navigator>
			</NavigationNativeContainer>
		</View>
 	);
}