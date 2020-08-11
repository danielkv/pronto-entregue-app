import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';

import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId } from '../../controller/hooks';
import { Button, useTheme } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import Block from './Block';

import { GET_DELIVERY_MAN, ENABLE_DELIVERY_MAN, DISABLE_DELIVERY_MAN, INDEX_DELIVERIES } from '../../graphql/deliveries';

export default function Deliveries() {
	const loggedUserId = useLoggedUserId();
	const { palette } = useTheme();

	const [enableDeliveryMan, { loading: loadingEnable }] = useMutation(ENABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });
	const [disableDeliveryMan, { loading: loadingDisable }] = useMutation(DISABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });

	const { data: { deliveryMan = {} }={}, loading: loadingDeliveryman } = useQuery(GET_DELIVERY_MAN, { variables: { userId: loggedUserId }, fetchPolicy: 'cache-and-network' });
	const deliveryManEnabled = deliveryMan?.isEnabled;
	
	const waitingDeliveryFilter = { status: 'waitingDelivery' };
	const activeFilter = { status: { "$not": ['canceled', 'delivered'] }, deliveryManId: loggedUserId };
	const deliveredFilter = { status: 'delivered', deliveryManId: loggedUserId };
	const weekFilter = { status: 'delivered', deliveryManId: loggedUserId }

	const { data: { waitingDelivery=0, active=0, delivered=0, week=0 } = {}, loading: loadingCountDelivery } = useQuery(INDEX_DELIVERIES, { variables: { waitingDelivery: waitingDeliveryFilter, active: activeFilter, delivered: deliveredFilter, week: weekFilter } });
	
	if (loadingDeliveryman || loadingCountDelivery) return <LoadingBlock />;

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
			<View style={{ marginHorizontal: 35, marginVertical: 15 }}>
				<View>
					<Block style={{ width: '100%', height: 80 }} title='Aguardando entregador' info1={waitingDelivery} icon={{ name: 'clock', color: palette.primary.main }}  />
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20  }}>
					<Block color='dark' title='Ativas' info1={BRL(9).format()} info2={active} icon={{ name: 'activity', color: palette.primary.main }} />
					<Block color='dark' title='Finalizadas hoje' info1={BRL(9).format()} info2={delivered} icon={{ name: 'user-check', color: palette.primary.main }} />
				</View>
				<View style={{ marginTop: 20 }}>
					<Block color='dark' style={{ width: '100%', height: 100 }} title='Resumo da semana' info1={BRL(9).format()} info2={week} icon={{ name: 'calendar', color: palette.primary.main }}  />
				</View>
			</View>
		</ScrollView>
	);
}