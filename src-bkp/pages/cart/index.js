import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import Header from '../../navigation/header';
import Cart from './cart';
import Payment from './payment';
import Finish from './finish';

const cartRoutes = createStackNavigator({
	
	Cart : Cart,
	Payment : Payment,
	Finish : Finish,

}, {
	defaultNavigationOptions : {
		header : (props) => <Header {...props} />,
		title:'Carrinho',
	},
	initialRouteName :'Cart'
});

export default cartRoutes;