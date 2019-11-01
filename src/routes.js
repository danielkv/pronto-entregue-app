import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/home';
import CategoryScreen from './pages/category';
import header from './components/header';
import theme from './theme';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name='Pages'>
				{()=>(<Stack.Navigator screenOptions={{header:header, headerTransparent:true, cardStyle: {backgroundColor: theme.colors.primary}}}>
					<Stack.Screen name='HomeScreen' component={HomeScreen} options={{title:''}} />
					<Stack.Screen name='CategoryScreen' component={CategoryScreen} options={{title:'Produtos'}} />
				</Stack.Navigator>)}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
}
