import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
import { Icon, withBadge } from 'react-native-elements';

import { GET_CART } from '../../../graphql/cart';

export default function CartButton() {
	const navigation = useNavigation();
	const { data: { cartItems } } = useQuery(GET_CART);

	const BadgeIcon = withBadge(cartItems.length,
		{
			hidden: !cartItems.length,
			top: -5,
			left: -16,
			right: 'auto'
		})(Icon);

	return (
		<TouchableOpacity onPress={()=>navigation.navigate('CartScreen')}>
			<BadgeIcon name='shopping-cart' color='#fff' />
		</TouchableOpacity>
	);
}
