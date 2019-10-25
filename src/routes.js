import React from 'react';
import { createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import {DrawerMenu, drawerOptions } from './navigation/drawerMenu';
import LoadingScreen from './loadingScreen';

import MenuRoutes from './pages/menu';
import CartRoutes from './pages/cart';
import UserRoutes from './pages/user';
import OrdersRoutes from './pages/orders';

import About from './pages/about';
import Login from './pages/login';
import Subscription from './pages/subscription'

import NavigationService from './NavigationService';

const DrawerNavigator = createDrawerNavigator({
	MenuRoutes : {
		screen: MenuRoutes,
		navigationOptions: {
			drawerIcon : ({tintColor}) => (<Icon name='food' size={20} color='#fff' />),
			title: 'Cadápio'
		}
	},
	CartRoutes : {
		screen: CartRoutes,
		navigationOptions: {
			drawerIcon : ({tintColor}) => (<Icon name='cart' size={20} color='#fff' />),
			title: 'Carrinho'
		}
	},
	UserRoutes : {
		screen: UserRoutes,
		navigationOptions: {
			drawerIcon : ({tintColor}) => (<Icon name='account-card-details' size={20} color='#fff' />),
			title: 'Meus dados'
		}
	},
	OrdersRoutes : {
		screen: OrdersRoutes,
		navigationOptions: {
			drawerIcon : ({tintColor}) => (<Icon name='ballot' size={20} color='#fff' />),
			title: 'Meus pedidos'
		}
	},
	About : {
		screen: About,
		navigationOptions: {
			drawerIcon : ({tintColor}) => (<Icon name='information' size={20} color='#fff' />),
			title: 'Sobre a Pizzaria'
		}
	},
	Login : {
		screen: Login,
		navigationOptions: {
			drawerIcon : ({tintColor}) => (<Icon name='login-variant' size={20} color='#fff' />),
			title: 'Login'
		}
	},
	Subscription : {
		screen: Subscription,
		navigationOptions: {
			drawerIcon : ({tintColor}) => (<Icon name='account-plus' size={20} color='#fff' />),
			title: 'Cadastrar'
		}
	}
}, {
	contentComponent : props => (<DrawerMenu {...props} />),
	...drawerOptions,

	initialRouteName : 'Login'//'MenuRoutes'
});

const MainRoute = createStackNavigator({
	LoadingScreen : LoadingScreen,
	DrawerNavigator : DrawerNavigator
}, {
	defaultNavigationOptions: {
		header:null
	}
})

const AppContainer = createAppContainer(MainRoute);

const styledStatus = StyleSheet.create({
	statusBar: {
		backgroundColor: "#C2185B",
		height: Constants.statusBarHeight,
	},

// rest of the styles
});

export default class Routes extends React.Component {
	render() {
		return (
			
				
				<AppContainer
					ref={(nav) => {NavigationService.setTopLevelNavigator(nav)}}
				/>
		
		);
	}
}