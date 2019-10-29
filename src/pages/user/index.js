import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import Header from '../../navigation/header';
import Add_Address from './add_address';
import AddressesComp from './addresses';
import Profile from './profile';


const userAuthenticationRoutes = createStackNavigator({
	
	Profile : Profile,
	Addresses : AddressesComp,
	Add_Address : Add_Address,
}, {
	defaultNavigationOptions : {
		header : (props) => <Header {...props} />,
		title:'Meus dados'
	},
	initialRouteName :'Profile'
});

export default userAuthenticationRoutes;