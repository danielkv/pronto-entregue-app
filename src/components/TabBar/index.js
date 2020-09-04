import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import { useLoggedUserId, useSelectedAddress } from '../../controller/hooks';
import { Badge } from '../../react-native-ui';
import MenuItem from './MenuItem';
import { Container } from './styles';

import  { GET_CART } from '../../graphql/cart';

export default function TabBar({ navigation, ...restProps }) {
	const loggedUserId = useLoggedUserId();
	const [showTabBar, setShowTabBar] = useState(false);
	const [routeName, setRouteName] = useState('')
	const { location = null } = useSelectedAddress();
		
	const { data: { cartItems } } = useQuery(GET_CART);
	
	function handleOrderListPress() {
		if (loggedUserId)
			navigation.navigate('OrderListScreen')
		else {
			Alert.alert(
				'Para ver seu pedidos, você tem que estar logado.',
				'Quer fazer isso agora?',
				[
					{ text: 'Sim', onPress: ()=>navigation.navigate('LoginScreen', { redirect: 'OrderListScreen' }) },
					{ text: 'Não' }
				]
			);
		}
	}

	useEffect(()=>{
		if (!navigation) return;

		const unsubscribe = navigation.addListener('state', () => {
			const options = navigation.getCurrentOptions();

			setRouteName(options.selectedMenu);
			setShowTabBar(!(options.tabBar === false));
		});

		return unsubscribe;
		
	}, [navigation])
		
	if (!showTabBar || !location) return false;
	
	return (
		<Container {...restProps} >
			<MenuItem selected={routeName === 'Home'} icon='home' label='Home' onPress={()=>navigation.navigate('FeedScreen')} />
			<Badge color='primary' badgeContent={cartItems.length} style={{ badge: { marginTop: 5, marginRight: 8 } }}>
				<MenuItem selected={routeName === 'Cart'} icon='shopping-bag' label='Cesta' onPress={()=>navigation.navigate('CartScreen')} />
			</Badge>
			<MenuItem selected={routeName === 'Order'} icon='list' label='Meus Pedidos' onPress={handleOrderListPress} />
		</Container>
	);
}
