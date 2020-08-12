import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId } from '../../controller/hooks';
import { Typography, Icon, useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import DeliveryItem from './DeliveryItem';

import { GET_DELIVERIES, UPDATE_DELIVERY_SUBSCRIPTION } from '../../graphql/deliveries';

export default function ListDeliveries({ route: { params } }) {
	const loggedUserId = useLoggedUserId();
	const { palette } = useTheme();
	const [refreshing, setRefreshing] = useState(false);

	const { data: { deliveries = [] } = {}, loading: loadingDeliveries, subscribeToMore = null, error: deliveryError, refetch=null } = useQuery(GET_DELIVERIES, { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network',  variables: { filter: params.filter } });

	function onRefresh() {
		if (typeof refetch !== 'function') return;
		setRefreshing(true);
		refetch().finally(()=>setRefreshing(false));
	}

	useEffect(()=>{
		const unsubscribeUpdate = subscribeToMore({
			document: UPDATE_DELIVERY_SUBSCRIPTION
		})

		return () => {
			unsubscribeUpdate();
		}
	}, [loggedUserId])

	if (loadingDeliveries && !deliveries.length) return <LoadingBlock />;
	if (deliveryError) return <ErrorBlock error={getErrorMessage(deliveryError)} />

	return (
		<ScrollView
			style={{ flex: 1 }}
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<Typography style={{ fontSize: 12, textAlign: 'center' }}>Arreste para atualizar</Typography>
			
			{deliveries.length
				? (
					<View>
						<View style={{ marginHorizontal: 35, marginTop: 20 }}>
							<Typography variant='title'>{params.title || 'Entregas'}</Typography>
						</View>
						{deliveries.map((delivery, index) => (
							<DeliveryItem key={delivery.id} orderIndex={index} item={delivery} />
						))}
					</View>
				)
				: (
					<View style={{ marginHorizontal: 35, marginVertical: 15, alignItems: 'center' }}>
						<Icon name='bell' size={40} />
						<Typography variant='subtitle' style={{ textAlign: 'center' }}>Mantenha suas notificações habilitadas para receber novas entregas</Typography>
					</View>
						
				)}
		</ScrollView>
	);
}