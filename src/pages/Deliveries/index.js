import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';

import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId } from '../../controller/hooks';
import { Typography, Button } from '../../react-native-ui';
import DeliveryItem from './DeliveryItem';

import { GET_DELIVERIES, GET_DELIVERY_MAN, ENABLE_DELIVERY_MAN, DISABLE_DELIVERY_MAN } from '../../graphql/deliveries';

export default function Deliveries() {
	const loggedUserId = useLoggedUserId();

	const [enableDeliveryMan, { loading: loadingEnable }] = useMutation(ENABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });
	const [disableDeliveryMan, { loading: loadingDisable }] = useMutation(DISABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });

	const { data: { deliveryMan = {} }={}, loading: loadingDeliveryman } = useQuery(GET_DELIVERY_MAN, { variables: { userId: loggedUserId } });
	const filter = { status: ['waiting', 'waitingDelivery', 'preparing', 'delivering', 'delivered'], deliveryManId: { '$or': [null, 240] } };
	const { data: { deliveries = [] } = {}, loading: loadingDeliveries } = useQuery(GET_DELIVERIES, { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network',  variables: { filter } });

	if (loadingDeliveryman || loadingDeliveries && !deliveries.length) return <LoadingBlock />;

	return (
		<ScrollView
			style={{ flex: 1 }}
			//refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<View style={{ marginHorizontal: 35 }}>
				{deliveryMan.isEnabled
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
			{deliveryMan.isEnabled
				? <View>
					<View style={{ marginHorizontal: 35, marginTop: 20 }}>
						<Typography variant='title'>Entregas</Typography>
					</View>
					{loadingDeliveries && <LoadingBlock />}
					{deliveries.map((delivery, index) => (
						<DeliveryItem key={delivery.id} orderIndex={index} item={delivery} deliveryMan={deliveryMan} />
					))}
				</View>
				: <View style={{ marginHorizontal: 35, marginVertical: 15 }}>
					<Typography variant='subtitle' style={{ textAlign: 'center' }}>Habilite no botão acima para ver os entregas em aberto e receber as notificações</Typography>
				</View>
			}
		</ScrollView>
	);
}