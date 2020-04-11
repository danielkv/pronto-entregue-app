import React from 'react';
import { Alert } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Badge } from '../../react-native-ui';
import { useLoggedUserId } from '../../utils/hooks';
import MenuItem from './MenuItem';
import { Container } from './styles';

import  { GET_CART } from '../../graphql/cart';

export default function TabBar(props) {
	const navigation = useNavigation();
	const loggedUserId = useLoggedUserId();
	const { name: routeName } = useRoute();

	const { data: { cartItems } } = useQuery(GET_CART);

	function handleOrderListPress() {
		if (loggedUserId)
			navigation.navigate('OrderRoutes', { screen: 'OrderListScreen' })
		else {
			Alert.alert(
				'Para ver seu pedidos, você tem que estar logado.',
				'Quer fazer isso agora?',
				[
					{ text: 'Sim', onPress: ()=>navigation.navigate('AuthenticationRoutes', { screen: 'LoginScreen', params: { redirect: 'OrderRoutes' } }) },
					{ text: 'Não' }
				]
			);
		}
	}

	return (
		<Container {...props} >
			<MenuItem selected={routeName === 'HomeRoutes'} icon='home' label='Home' onPress={()=>navigation.navigate('HomeRoutes', { screen: 'FeedScreen' })} />
			<Badge color='primary' badgeContent={cartItems.length} style={{ badge: { marginTop: 5, marginRight: 8 } }}>
				<MenuItem selected={routeName === 'CartRoutes'} icon='shopping-bag' label='Cesta' onPress={()=>navigation.navigate('CartRoutes', { screen: 'CartScreen' })} />
			</Badge>
			<MenuItem selected={routeName === 'OrderRoutes'} icon='list' label='Meus Pedidos' onPress={handleOrderListPress} />
			{/* <MenuItem selected={routeName === 'SettingsRoutes'} icon='settings' label='Opções' screenName='HomeRoutes' /> */}
		</Container>
	);
}
