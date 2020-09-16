import React from 'react'
import { View } from 'react-native'

import { Typography, Icon } from '../../../../react-native-ui'
import DeliveryController from '../../../../controller/delivery'

export default function OrderType({ order }) {
	return (
		<View style={{ marginVertical: 10 }}>
			{order.type === 'takeout'
				? <Typography>Retirada no Balcão</Typography>
				: (
					<View>
						<Typography style={{ fontWeight: 'bold' }}>{`${order.address.street}, n ${order.address.number}`}</Typography>
						<Typography variant='subtitle2'>{order.address.district}</Typography>
						<Typography variant='subtitle2'>{`${order.address.city} - ${order.address.state}`}</Typography>
						<Typography variant='subtitle2'>{order.address.zipcode}</Typography>
						{Boolean(order.address.complement) && <Typography variant='subtitle2'>{order.address.complement}</Typography>}
						{Boolean(order.address.reference) && <Typography variant='caption'>
							<Typography variant='caption' style={{ fontWeight: 'bold' }}>Ponto de referência</Typography>: {order.address.reference}
						</Typography>}

						{order.type === 'peDelivery' && (
							<View style={{ marginTop: 5, borderRadius: 10, backgroundColor: '#eaeaea', padding: 10, paddingLeft: 10 }}>
								<View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
									<Icon name='racing-helmet' type='material-community' size={18} color='#666' />
									<Typography style={{ fontSize: 13, textAlign: 'center' }}>Entrega de responsabilidade Pronto, entregue!</Typography>
								</View>
								{Boolean(order.delivery && order.delivery.deliveryMan) && (
									<View>
										<Typography variant='subtitle2'>
											<Typography style={{ fontFamily: 'Roboto-Bold' }}>Entregador:</Typography>
											{' ' + order.delivery.deliveryMan.user.fullName}
										</Typography>
										<Typography variant='subtitle2' style={{ fontSize: 12 }}>
											<Typography style={{ fontFamily: 'Roboto-Bold' }}>Status da entrega:</Typography>
											{' ' + DeliveryController.statusLabel(order.delivery.status)}
										</Typography>
										{Boolean(order.delivery.deliveryMan.user.phones.length) && <Typography variant='caption'>{order.delivery.deliveryMan.user.phones[0].value}</Typography>}
									</View>
								)}
							</View>
						)}
					</View>
				)}
		</View>
	)
}
