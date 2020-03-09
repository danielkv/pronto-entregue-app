import React from 'react';

import { useNavigation } from '@react-navigation/core';

import MenuItem from './MenuItem';
import { Container } from './styles';

export default function TabBar(props) {
	const navigation = useNavigation();

	return (
		<Container {...props} >
			<MenuItem selected icon='home' label='Home' onPress={()=>navigation.navigate('HomeRoutes', { screen: 'FeedScreen' })} />
			<MenuItem icon='shopping-bag' label='Cesta' onPress={()=>navigation.navigate('CartRoutes', { screen: 'CartScreen' })} />
			<MenuItem icon='settings' label='Opções' screenName='HomeRoutes' />
		</Container>
	);
}
