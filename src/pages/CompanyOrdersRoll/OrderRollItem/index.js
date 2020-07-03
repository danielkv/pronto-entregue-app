import React, { Fragment } from 'react'
import { View, Image } from 'react-native'

import moment from 'moment'

import { Chip, Typography, Paper, Divider, IconButton, Icon, useTheme } from '../../../react-native-ui'
import { getOrderStatusLabel, getStatusColors } from '../../../utils'
import { BRL } from '../../../utils/currency'
import OrderRollProduct from './OrderRollProduct'

export default function OrderRollItem({ item: order, handleOpenModalStatus, orderIndex }) {
	const { palette } = useTheme();
	const colors = getStatusColors(order.status);
	const canEdit = !['delivered', 'canceled'].includes(order.status);

	const orderTotal = order.price + order.discount;

	return (
		<Paper style={{ marginTop: 10, marginBottom: 10, padding: 15, position: 'relative', backgroundColor: order.status === 'waiting' ? 'rgba(0,0,0,.1)' : 'white' }} elevation={0}>
			
			{canEdit && <IconButton
				onPress={()=>handleOpenModalStatus(orderIndex)}
				icon={{ type: 'material-community', name: 'dots-vertical' }}
				variant='filled'
				color='primary'
				style={{ root: { position: 'absolute', right: 5, top: -10 } }}
			/>}

			<View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
				<Chip style={{ root: { height: 30 } }} label={`#${order.id}`} color='secondary' />
				<Chip style={{ root: { height: 30, marginLeft: 6, paddingVertical: 0, borderColor: colors.background }, text: { color: colors.background } }} label={getOrderStatusLabel(order.status)} variant='outlined' />
				<Typography style={{ marginLeft: 6 }} variant='subtitle'>{moment(order.createdAt).format('DD/MM HH:mm')}</Typography>
			</View>
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

						<View style={{ marginTop: 10, position: 'relative' }}>
						
							{order.type === 'takeout'
								? <Typography>Retirada no Balcão</Typography>
								: (
									<View>
										<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{`${order.address.street}, n ${order.address.number}`}</Typography>
										<Typography variant='subtitle'>{order.address.district}</Typography>
										<Typography variant='subtitle'>{`${order.address.city} - ${order.address.state}`}</Typography>
										<Typography variant='subtitle'>{order.address.zipcode}</Typography>
										<View style={{ marginTop: 10 }}>
											<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>Pagamento:</Typography>
											<View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
												<View style={{ alignItems: 'center', flexDirection: 'row' }}>
													<Image style={{ marginRight: 5, width: 20, height: 30, resizeMode: 'contain' }} source={{ uri: order.paymentMethod.image }} />
													<Typography variant='subtitle'>{`${order.paymentMethod.displayName}`}</Typography>
												</View>
												<View style={{ alignItems: 'flex-end' }}>
													{!!order.discount &&(
														<>
															<Typography variant='subtitle' style={{ fontSize: 13 }}>{BRL(orderTotal).format()}</Typography>
															<Typography variant='subtitle' style={{ fontSize: 13 }}>{`${order.creditHistory ? 'Créditos: ' : 'Descontos: '}${BRL(order.discount).format()}`}</Typography>
														</>)}
													<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{BRL(order.price).format()}</Typography>
												</View>
											</View>
										</View>
										{Boolean(order.message) && (
											<View style={{ marginTop: 10 }}>
												<Typography style={{ fontFamily: 'Roboto-Bold' }}>
													Observações:
													<Typography variant='subtitle'>{order.message}</Typography>
												</Typography>
											
											</View>
										)}
									</View>
								)}
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
