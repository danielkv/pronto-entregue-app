import React from 'react';

import { useNavigation } from '@react-navigation/core';

import { getStatusText } from '../../../utils';
import {
	Container,
	DateTime,
	OrderItems,
	OrderFooter,
	OrderPrice,
	StatusBadge,
	StatusBadgeText,
} from './styles';


export default function Order({ order: { id, status, createdDate, createdTime, countProducts, price } }) {
	const navigation = useNavigation();
	const statusText = getStatusText(status);
	
	return (
		<Container onPress={()=>navigation.navigate('OrderScreen', { orderId: id })}>
			<DateTime>{`${createdDate} - ${createdTime}`}</DateTime>
			<OrderItems>{`${countProducts} ${countProducts > 1 ? 'itens' : 'item'}`}</OrderItems>
			<OrderFooter>
				<OrderPrice>{`R$ ${price.toFixed(2).replace('.', ',')}`}</OrderPrice>
				<StatusBadge status={status}>
					<StatusBadgeText status={status}>{statusText}</StatusBadgeText>
				</StatusBadge>
			</OrderFooter>
		</Container>
	);
}
