import React, { useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';

import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId } from '../../controller/hooks';
import { Typography, Button, Icon } from '../../react-native-ui';
import DeliveryItem from './DeliveryItem';

import { GET_DELIVERIES, GET_DELIVERY_MAN, ENABLE_DELIVERY_MAN, DISABLE_DELIVERY_MAN, UPDATE_DELIVERY_SUBSCRIPTION } from '../../graphql/deliveries';

export default function Deliveries() {
	const loggedUserId = useLoggedUserId();

	const [enableDeliveryMan, { loading: loadingEnable }] = useMutation(ENABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });
	const [disableDeliveryMan, { loading: loadingDisable }] = useMutation(DISABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });

	const { data: { deliveryMan = {} }={}, loading: loadingDeliveryman } = useQuery(GET_DELIVERY_MAN, { variables: { userId: loggedUserId } });
	const deliveryManEnabled = deliveryMan?.isEnabled;

	const filter = { status: ['waiting', 'waitingDelivery', 'preparing', 'delivering', 'delivered', 'canceled'], deliveryManId: { '$or': [null, loggedUserId] } };
	const { data: { deliveries = [] } = {}, loading: loadingDeliveries, subscribeToMore = null } = useQuery(GET_DELIVERIES, { skip: !deliveryManEnabled, notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network',  variables: { filter } });


	useEffect(()=>{
		if (!deliveryManEnabled || !loggedUserId || !subscribeToMore) return;

		const unsubscribeUpdate = subscribeToMore({
			document: UPDATE_DELIVERY_SUBSCRIPTION,
			//variables: { userId: loggedUserId },
			updateQuery(prev, { subscriptionData: { data: { delivery = null } } }) {
				if (!delivery) return prev;

				const deliveryFoundIndex = prev.deliveries.findIndex(d => d.id === delivery.id)

				if (deliveryFoundIndex < 0) {
					if (!delivery.deliveryMan || delivery.deliveryMan.user.id == loggedUserId)
						return {
							deliveries: [delivery, ...prev.deliveries]
						}
					else
						return prev;
				} else if (prev.deliveries[deliveryFoundIndex]?.deliveryMan?.user.id !== loggedUserId) {
					const deliveriesReturn = prev.deliveries;
					deliveriesReturn.splice(deliveryFoundIndex, 1);
					return {
						deliveries: deliveriesReturn
					}
				}
			}
		})

		return () => {
			unsubscribeUpdate();
		}
	}, [deliveryManEnabled, loggedUserId])

	if (loadingDeliveryman || loadingDeliveries && !deliveries.length) return <LoadingBlock />;

	return (
		<ScrollView
			style={{ flex: 1 }}
			//refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<View style={{ marginHorizontal: 35 }}>
				{deliveryManEnabled
					? <Button
						color='default'
						variant='filled'
						label='Desabilitar pedidos'
						onPress={()=>disableDeliveryMan()}
					>
						{loadingDisable
							? <ActivityIndicator color='#fff' />
							: 'Desabilitar entregas'}
					</Button>
					: <Button
						color='secondary'
						variant='filled'
						onPress={()=>enableDeliveryMan()}
					>
						{loadingEnable
							? <ActivityIndicator color='#fff' />
							: 'Habilitar entregas'}
					</Button>
				}
			</View>
			{deliveryManEnabled
				? deliveries.length
					? (
						<View>
							<View style={{ marginHorizontal: 35, marginTop: 20 }}>
								<Typography variant='title'>Entregas</Typography>
							</View>
							{loadingDeliveries && <LoadingBlock />}
							{deliveries.map((delivery, index) => (
								<DeliveryItem key={delivery.id} orderIndex={index} item={delivery} deliveryMan={deliveryMan} />
							))}
						</View>
					)
					: (
						<View style={{ marginHorizontal: 35, marginVertical: 15, alignItems: 'center' }}>
							<Icon name='bell' size={40} />
							<Typography variant='subtitle' style={{ textAlign: 'center' }}>Mantenha suas notificações ligadas para receber novas entregas</Typography>
						</View>
						
					)
				
				: (
					<View style={{ marginHorizontal: 35, marginVertical: 15 }}>
						<Typography variant='subtitle' style={{ textAlign: 'center' }}>Pressione o botão acima para ver as entregas e receber as notificações</Typography>
					</View>
				)}
		</ScrollView>
	);
}