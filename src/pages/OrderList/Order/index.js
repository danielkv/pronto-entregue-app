import React from 'react';
import { useNavigation } from '@react-navigation/core';

import {
	Container,
	DateTime,
	OrderItems,
	OrderFooter,
	OrderPrice,
	StatusBadge,
	StatusBadgeText,
} from './styles';

import { getStatusText } from '../../../utils';

export default function Order({ order: { id, status, createdDate, createdTime, products_qty, price } }) {
	const navigation = useNavigation();
	const statusText = getStatusText(status);
	
	return (
		<Container onPress={()=>navigation.navigate('OrderScreen', { order_id: id })}>
			<DateTime>{`${createdDate} - ${createdTime}`}</DateTime>
			<OrderItems>{`${products_qty} ${products_qty > 1 ? 'itens' : 'item'}`}</OrderItems>
			<OrderFooter>
				<OrderPrice>{`R$ ${price.toFixed(2).replace('.', ',')}`}</OrderPrice>
				<StatusBadge status={status}>
					<StatusBadgeText status={status}>{statusText}</StatusBadgeText>
				</StatusBadge>
			</OrderFooter>
		</Container>
	);
}
