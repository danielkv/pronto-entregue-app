import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import OrderController from '../../controller/order';
import { Typography, Chip, Icon } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import {
	Container,
	TextBlock
} from './styles';

export default function OrderItem({ item: order }) {
	const navigation = useNavigation();

	const createdAt = moment(order.createdAt);
	const displayDate = moment().diff(createdAt, 'day') >= 1 ? createdAt.format('DD/MM/YY HH:mm') : createdAt.fromNow();

	const statusColor = OrderController.statusColors(order.status);
	const statusText = OrderController.statusLabel(order.status);

	return (
		<TouchableOpacity onPress={()=>navigation.navigate('OrderScreen', { orderId: order.id })}>
			<Container>
				<Image
					source={{ uri: order.company.image }}
					style={{
						width: 60,
						height: 60,
						marginRight: 15,
						borderRadius: 12,
						resizeMode: 'cover'
					}}
				/>
				<TextBlock>
					<Typography variant='subtitle' style={{ fontSize: 14 }}>{displayDate}</Typography>
					<Typography variant='h4' style={{ fontFamily: 'Roboto-Bold' }}>{order.company.displayName}</Typography>
					
					<Typography variant='subtitle' style={{ fontSize: 13 }}>{`${order.countProducts} ${order.countProducts > 1 ? 'itens' : 'item'}`}</Typography>

					<Typography variant='h5' style={{ fontFamily: 'Roboto-Bold', marginTop: 15 }}>{BRL(order.price).format()}</Typography>
					<View style={{ position: 'absolute', right: 0, bottom: -4, flexDirection: 'row' , alignItems: 'center' }}>
						{order.scheduledTo && <Icon name='calendar' size={20} color='#bbb' type='material-community' />}
						<Chip
							style={{
								root: { paddingHorizontal: 10, height: 30,  backgroundColor: statusColor.background },
								text: { fontSize: 12, color: statusColor.text }
							}}
							label={statusText}
						/>
					</View>
				</TextBlock>
			</Container>
		</TouchableOpacity>
	);
}
