import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import { useTheme, Icon, Typography, Chip, Avatar } from '../../react-native-ui';
import { getStatusText, getStatusColors } from '../../utils';
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

	const statusColor = getStatusColors(order.status);

	return (
		<TouchableOpacity onPress={()=>navigation.navigate('OrderScreen', { orderId: order.id })}>
			<Container>
				<IconBlock>
					<Icon name='list' color={palette.background.dark} />
				</IconBlock>
				<TextBlock>
					<Typography variant='subtitle'>{displayDate}</Typography>
					<Typography variant='h4' style={{ fontWeight: "bold" }}>{order.company.displayName}</Typography>
					
					<Typography variant='subtitle'>{`${order.countProducts} ${order.countProducts > 1 ? 'itens' : 'item'}`}</Typography>

					<Typography variant='h5' style={{ fontWeight: 'bold', marginTop: 15 }}>{`R$ ${order.price.toFixed(2).replace('.', ',')}`}</Typography>
					<Chip
						style={{
							root: { paddingHorizontal: 10, height: 30, position: 'absolute', right: 0, bottom: 0, backgroundColor: statusColor.background },
							text: { fontSize: 13, color: statusColor.text }
						}}
						label={getStatusText(order.status)}
					/>
				</TextBlock>
			</Container>
		</TouchableOpacity>
	);
}
