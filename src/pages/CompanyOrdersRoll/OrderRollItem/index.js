import React, { Fragment } from 'react';
import { View, Image } from 'react-native';

import moment from 'moment'

import DeliveryAddress from '../../../components/DeliveryAddress'

import OrderController from '../../../controller/order'
import { Chip, Typography, Paper, Divider, IconButton, Icon, useTheme } from '../../../react-native-ui'
import { BRL } from '../../../utils/currency'
import OrderRollProduct from './OrderRollProduct'
import OrderType from './OrderType';

export default function OrderRollItem({ item: order, handleOpenModalStatus, orderIndex }) {
	const { palette } = useTheme();
	const colors = OrderController.statusColors(order.status);
	const canEdit = !['delivered', 'canceled'].includes(order.status);

	const orderTotal = order.price + order.discount;

	return (
		<Paper style={{ marginTop: 10, marginBottom: 10, padding: 15, position: 'relative', backgroundColor: order.status === 'waiting' ? 'rgba(0,0,0,.1)' : 'white' }} elevation={0}>

			{canEdit && <IconButton
				onPress={() => handleOpenModalStatus(orderIndex)}
				icon={{ type: 'material-community', name: 'dots-vertical' }}
				variant='filled'
				color='primary'
				style={{ root: { position: 'absolute', right: 5, top: -10 } }}
			/>}

			<View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
				<Chip style={{ root: { height: 30 } }} label={`#${order.id}`} color='secondary' />
				<Chip style={{ root: { height: 30, marginLeft: 6, paddingVertical: 0, borderColor: colors.background }, text: { color: colors.background } }} label={OrderController.statusLabel(order.status)} variant='outlined' />
				<Typography style={{ marginLeft: 6 }} variant='subtitle'>{moment(order.createdAt).format('DD/MM HH:mm')}</Typography>
			</View>
			{Boolean(order.scheduledTo) && (
				<View style={{
					flexDirection: 'row',
					alignItems: 'flex-start',
					backgroundColor: '#e6e6e6',
					padding: 13,
					borderRadius: 15,
					marginBottom: 10
				}}>
					<Icon name='calendar' type='material-community' color='#333' style={{ root: { marginTop: 0 } }} />
					<View style={{
						marginLeft: 8
					}}>
						<Typography style={{ fontFamily: 'Roboto-Bold', color: '#333' }}>Este pedido foi agendado</Typography>
						<Typography style={{ color: '#555' }}>{`Dia: ${moment(order.scheduledTo).format('DD/MM/YYYY')}`}</Typography>
						<Typography style={{ color: '#555' }}>{`Horário aprox.: ${moment(order.scheduledTo).format('HH:mm')}`}</Typography>
					</View>
				</View>
			)}
			{order.status !== 'waiting'
				? <View>
					<View style={{ marginRight: 30 }}>
						{order.products.map((product, index) => (
							<Fragment key={product.id}>
								{index > 0 && <Divider style={{ marginTop: 8, marginBottom: 8 }} />}
								<OrderRollProduct product={product} />
							</Fragment>
						))}
					</View>
					<Divider />
					<View>
						<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{order.user.fullName}</Typography>
						{Boolean(order.user.phones && order.user.phones.length) && <View><Typography variant='subtitle'>{order.user.phones[0].value}</Typography></View>}
						<Typography variant='subtitle'>{order.user.email}</Typography>

						<OrderType order={order} />

						<View style={{ marginTop: 10, position: 'relative' }}>

							<View style={{ marginTop: 10 }}>
								<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>Pagamento:</Typography>
								<View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>

									{Boolean(order.paymentMethod) && <View style={{ alignItems: 'center', flexDirection: 'row' }}>
										<Image style={{ marginRight: 5, width: 20, height: 30, resizeMode: 'contain' }} source={{ uri: order.paymentMethod.image }} />
										<Typography variant='subtitle'>{`${order.paymentMethod.displayName}`}</Typography>
									</View>}
									<View style={{ alignItems: 'flex-end' }}>
										{!!order.discount && (
											<>
												<Typography variant='subtitle' style={{ fontSize: 13 }}>{BRL(orderTotal).format()}</Typography>
												<Typography variant='subtitle' style={{ fontSize: 13 }}>{`${order.creditHistory ? 'Créditos: ' : 'Descontos: '}${BRL(order.discount).format()}`}</Typography>
											</>)}
										<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{BRL(order.price).format()}</Typography>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				: <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
					<Icon name='info' size={18} color={palette.background.dark} />
					<Typography variant='subtitle' style={{ color: palette.background.dark, fontSize: 16 }}>Aceite o pedido para ver mais</Typography>
				</View>}
		</Paper>
	)
}