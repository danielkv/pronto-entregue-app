import React from 'react';
import {createStackNavigator} from 'react-navigation';

import Header from '../../navigation/header';
import Orders from './orders';
import Order from './order';


const OrdersRoutes = createStackNavigator({
	
	Orders : Orders,
	Order :  Order,
		

}, {
	defaultNavigationOptions : {
		header : (props) => <Header {...props} />,
		title:'Meus Pedidos'
	},
	initialRouteName :'Orders'
});

export default OrdersRoutes;