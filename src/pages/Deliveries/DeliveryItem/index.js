import React from 'react'
import { View, ActivityIndicator, Alert, Platform, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useMutation } from '@apollo/react-hooks';

import DeliveryAddress from '../../../components/DeliveryAddress';

import { useLoggedUserId } from '../../../controller/hooks';
import { Chip, Typography, Paper, Button, Icon } from '../../../react-native-ui'
import { getOrderStatusLabel, getStatusColors } from '../../../utils'
import { BRL } from '../../../utils/currency'
import { getErrorMessage } from '../../../utils/errors';
import ActionItems from './ActionItems';

import { SET_DELIVERY_MAN } from '../../../graphql/deliveries';


export default function DeliveryItem({ item: delivery, deliveryMan }) {
	const colors = getStatusColors(delivery.status);
	const loggedUserId = useLoggedUserId();

	const [setDeliveryMan, { loading: loadingSetDeliveryMen }] =useMutation(SET_DELIVERY_MAN, { variables: { deliveryId: delivery.id, userId: loggedUserId } });

	function handleSetDeliveryMan() {
		return setDeliveryMan()
			.catch((err)=>{
				Alert.alert('Ops! Algo deu errado', getErrorMessage(err));
			})
	}

	function handleOpenAddress(displayName, location) {
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${location[0]},${location[1]}`;
		const label = displayName;
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		});


		Linking.openURL(url);
	}

	// if user is the delivery man of this delivery
	const isDeliveryManOfThis = delivery?.deliveryMan?.user.id === loggedUserId;

	return (
		
		<Paper style={{ marginTop: 10, marginBottom: 10, padding: 15, position: 'relative', backgroundColor: isDeliveryManOfThis ? 'white': '#d8d0c0' }} elevation={0}>
			<View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
				<Chip style={{ root: { height: 30 } }} label={`#${delivery.id}`} color='secondary' />
				<Chip
					style={{
						root: { height: 30, marginLeft: 6, paddingVertical: 0, borderColor: colors.background },
						text: { color: colors.background, fontSize: 13 }
					}}
					label={getOrderStatusLabel(delivery)} variant='outlined' />
			</View>

			<View style={{ marginBottom: 15 }}>
				<Chip label={`Valor: ${BRL(delivery.value).format()}`} />
			</View>

			<View style={{ marginBottom: 15 }}>
				<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{delivery.description}</Typography>
				{isDeliveryManOfThis && (
					<>
						{Boolean(delivery.senderContact) && <View style={{ marginBottom: 6 }}>
							<Typography style={{ fontSize: 14 }}><Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 14 }}>Contato remetente:</Typography> {delivery.senderContact}</Typography>
						</View>}
						<View>
							<Typography style={{ fontFamily: 'Roboto-Bold',fontSize: 16 }}>Entregar à:</Typography>
							<Typography style={{ fontSize: 14 }}>{delivery.receiverName}</Typography>
							<Typography style={{ fontSize: 14 }}>{delivery.receiverContact}</Typography>
						</View>
					</>
				)}
			</View>
			
			<View>
				<TouchableOpacity onPress={()=>handleOpenAddress('Retirada', delivery.from.location)} style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 15, marginBottom: 10 }}>
					<DeliveryAddress address={delivery.from} title='Retirada' />
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>handleOpenAddress('Entrega', delivery.to.location)} style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 15 }}>
					<DeliveryAddress address={delivery.to} title='Entrega' />
				</TouchableOpacity>
				<View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center', justifyContent: 'flex-end' }}>
					<Typography style={{ color: '#999' }}>Clique nos endereços para abrir o mapa</Typography>
					<Icon name='info' color='#999' size={18} />
				</View>
			</View>

			<View style={{ marginTop: 10 }}>
				{deliveryMan.canAcceptDelivery && !delivery.deliveryMan && delivery.status === 'waitingDelivery'
					&& <Button
						color='primary'
						variant='filled'
						onPress={handleSetDeliveryMan}
					>
						{loadingSetDeliveryMen
							? <ActivityIndicator color='#fff' />
							: 'Aceitar entrega'
						}
					</Button>
				}
				{isDeliveryManOfThis && delivery.status !== 'delivered' && <ActionItems delivery={delivery} />}
			</View>
		</Paper>
	)
}
