import React, { useState } from 'react';
import { View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId } from '../../controller/hooks';
import { Button, useTheme, Typography } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import { getErrorMessage } from '../../utils/errors';
import Block from './Block';

import { GET_DELIVERY_MAN, ENABLE_DELIVERY_MAN, DISABLE_DELIVERY_MAN, INDEX_DELIVERIES } from '../../graphql/deliveries';

export default function Deliveries() {
	const loggedUserId = useLoggedUserId();
	const { palette } = useTheme();
	const [refreshing, setRefreshing] = useState(false);
	const navigation = useNavigation();
	
	const [enableDeliveryMan, { loading: loadingEnable }] = useMutation(ENABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });
	const [disableDeliveryMan, { loading: loadingDisable }] = useMutation(DISABLE_DELIVERY_MAN, { variables: { userId: loggedUserId } });
	
	const { data: { deliveryMan = {} }={}, loading: loadingDeliveryman } = useQuery(GET_DELIVERY_MAN, { variables: { userId: loggedUserId }, fetchPolicy: 'cache-and-network' });
	const deliveryManEnabled = deliveryMan?.isEnabled;

	const startOfDay = moment().startOf('day').valueOf();
	const endOfDay = moment().endOf('day').valueOf();

	const startOfWeek = moment().startOf('week').valueOf();
	const endOfWeek = moment().endOf('week').valueOf();
	
	const waitingDeliveryFilter = { status: ['waiting', 'waitingDelivery'], deliveryManId: null };
	const activeFilter = { status: { "$not": ['canceled', 'delivered'] }, deliveryManId: loggedUserId };
	const deliveredFilter = { status: 'delivered', deliveryManId: loggedUserId, createdAt: { '$between': [startOfDay, endOfDay] } };
	const weekFilter = { status: 'delivered', deliveryManId: loggedUserId, createdAt: { '$between': [startOfWeek, endOfWeek] } }
	
	const {
		data: {
			waitingDelivery=0,
			active=0,
			sumActive=0,
			delivered=0,
			sumDelivered=0,
			week=0,
			sumWeek=0
		} = {}, loading: loadingCountDelivery, refetch, error: errorIndexDeliveryMen
	} = useQuery(INDEX_DELIVERIES, { variables: { waitingDelivery: waitingDeliveryFilter, active: activeFilter, delivered: deliveredFilter, week: weekFilter } });

	function onRefresh() {
		if (!refetch) return;
		setRefreshing(true);
		refetch().finally(()=>setRefreshing(false));
	}
	
	if (loadingDeliveryman || loadingCountDelivery) return <LoadingBlock />;
	if (errorIndexDeliveryMen) return <ErrorBlock error={getErrorMessage(errorIndexDeliveryMen)} />

	return (
		<ScrollView
			style={{ flex: 1 }}
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<Typography style={{ fontSize: 12, textAlign: 'center' }}>Arreste para atualizar</Typography>

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
					<TouchableOpacity disabled={!deliveryManEnabled} onPress={()=>navigation.navigate('ListDeliveriesScreen', { filter: waitingDeliveryFilter, title: 'Entregas pendentes' })}>
						<Block style={{ width: '100%', height: 80, backgroundColor: deliveryManEnabled ? '#fff' : 'rgba(0,0,0,.05)' }} title='Aguardando entregador' info1={waitingDelivery} icon={{ name: 'clock', color: deliveryManEnabled ? palette.primary.main : '#ccc' }}  />
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
					<View style={{ width: '47%' }}>
						<TouchableOpacity  onPress={()=>navigation.navigate('ListDeliveriesScreen', { filter: activeFilter, title: 'Entregas ativas' })}>
							<Block title='Ativas' style={{ width: '100%' }} info1={BRL(sumActive).format()} info2={active} icon={{ name: 'activity', color: palette.primary.main }} />
						</TouchableOpacity>
					</View>
					<View style={{ width: '47%' }}>
						<TouchableOpacity  onPress={()=>navigation.navigate('ListDeliveriesScreen', { filter: deliveredFilter, title: 'Finalizadas hoje' })}>
							<Block color='dark' style={{ width: '100%' }} title='Finalizadas hoje' info1={BRL(sumDelivered).format()} info2={delivered} icon={{ name: 'user-check', color: palette.primary.main }} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ marginTop: 20 }}>
					<TouchableOpacity onPress={()=>navigation.navigate('ListDeliveriesScreen', { filter: weekFilter, title: 'Entregas da semana' })}>
						<Block color='dark' style={{ width: '100%', height: 100 }} title='Resumo da semana' info1={BRL(sumWeek).format()} info2={week} icon={{ name: 'calendar', color: palette.primary.main }}  />
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}