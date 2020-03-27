import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import { useTheme, Icon, Typography, Chip } from '../../react-native-ui';
import { getStatusText } from '../../utils';
import {
	Container,
	IconBlock,
	TextBlock
} from './styles';

export default function OrderItem({ item: order }) {
	const navigation = useNavigation();
	const { palette } = useTheme()

	const createdAt = moment(order.createdAt);
	const displayDate = moment().diff(createdAt, 'day') >= 1 ? createdAt.format('DD/MM/YY HH:mm') : createdAt.fromNow();

	return (
		<TouchableOpacity onPress={()=>navigation.push('OrderScreen', { orderId: order.id })}>
			<Container>
				<IconBlock>
					<Icon name='list' color={palette.background.dark} />
				</IconBlock>
				<TextBlock>
					<Typography variant='h4' style={{ fontWeight: "bold" }}>{displayDate}</Typography>
					<Typography variant='subtitle'>{`${order.countProducts} ${order.countProducts > 1 ? 'itens' : 'item'}`}</Typography>

					<Typography variant='h5' style={{ fontWeight: 'bold', marginTop: 15 }}>{`R$ ${order.price.toFixed(2).replace('.', ',')}`}</Typography>
					<Chip style={{ text: { fontSize: 13 }, root: { paddingHorizontal: 10, height: 30, position: 'absolute', right: 0, bottom: 0 } }} label={getStatusText(order.status)} />
				</TextBlock>
			</Container>
		</TouchableOpacity>
	);
}
