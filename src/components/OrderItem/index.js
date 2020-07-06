import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import { useTheme, Icon, Typography, Chip } from '../../react-native-ui';
import { getOrderStatusLabel, getStatusColors } from '../../utils';
import { BRL } from '../../utils/currency';
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
	const statusText = getOrderStatusLabel(order.status);

	return (
		<TouchableOpacity onPress={()=>navigation.navigate('OrderScreen', { orderId: order.id })}>
			<Container>
				<IconBlock>
					<Icon name='list' color={palette.background.dark} />
				</IconBlock>
				<TextBlock>
					<Typography variant='subtitle'>{displayDate}</Typography>
					<Typography variant='h4' style={{ fontFamily: 'Roboto-Bold' }}>{order.company.displayName}</Typography>
					
					<Typography variant='subtitle'>{`${order.countProducts} ${order.countProducts > 1 ? 'itens' : 'item'}`}</Typography>

					<Typography variant='h5' style={{ fontFamily: 'Roboto-Bold', marginTop: 15 }}>{BRL(order.price).format()}</Typography>
					<Chip
						style={{
							root: { paddingHorizontal: 10, height: 30, position: 'absolute', right: 0, bottom: 0, backgroundColor: statusColor.background },
							text: { fontSize: 13, color: statusColor.text }
						}}
						label={statusText}
					/>
				</TextBlock>
			</Container>
		</TouchableOpacity>
	);
}
