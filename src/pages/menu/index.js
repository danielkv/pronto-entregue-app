import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import NavigationService from '../../NavigationService';
import Header from '../../navigation/header';
import Menu from './home';
import Category from './category';
import Product from './product';


const menuRoutes = createStackNavigator({
	
	Menu : Menu,
	Category : Category,
	Product : {
		screen : Product,
		navigationOptions : {
			header:null
		}
	},

}, {
	defaultNavigationOptions : {
		header : (props) => <Header {...props} />,
		title:'Cardápio',
		headerRight : () => (
			<TouchableOpacity onPress={() => {NavigationService.navigate('Cart')}} >
				<Icon type='material-community' name='cart' size={24} color='#fff' />
			</TouchableOpacity>
		)
	},
	initialRouteName :'Menu'
});

export default menuRoutes;