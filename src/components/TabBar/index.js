import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Badge } from '../../react-native-ui';
import MenuItem from './MenuItem';
import { Container } from './styles';

import  { GET_CART } from '../../graphql/cart';

export default function TabBar(props) {
	const navigation = useNavigation();
	const { name: routeName } = useRoute();

	const { data: { cartItems } } = useQuery(GET_CART);

	return (
		<Container {...props} >
			<MenuItem selected={routeName === 'HomeRoutes'} icon='home' label='Home' onPress={()=>navigation.navigate('HomeRoutes', { screen: 'FeedScreen' })} />
			<Badge color='primary' badgeContent={cartItems.length} style={{ badge: { marginTop: 5, marginRight: 12 } }}>
				<MenuItem selected={routeName === 'CartRoutes'} icon='shopping-bag' label='Cesta' onPress={()=>navigation.navigate('CartRoutes', { screen: 'CartScreen' })} />
			</Badge>
			<MenuItem selected={routeName === 'OrderRoutes'} icon='list' label='Meus Pedidos' onPress={()=>navigation.navigate('OrderRoutes', { screen: 'OrderListScreen' })} />
			<MenuItem selected={routeName === 'SettingsRoutes'} icon='settings' label='Opções' screenName='HomeRoutes' />
		</Container>
	);
}
