import React, { Fragment, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, RefreshControl } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';

import CartItem from '../../components/CartItem';
import CompanyPanel from '../../components/CompanyPanel';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { Chip, Paper, Divider, Typography, Button, useTheme } from '../../react-native-ui';
import { getStatusText, getStatusColors } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import Blocks from './Blocks';
import {
	Container,
	BlocksContainer
} from './styles';

import { LOAD_ORDER, UPDATE_ORDER } from '../../graphql/orders';

export default function Order() {
	const { params: { orderId } } = useRoute();
	const { palette } = useTheme();
	const [refreshing, setRefreshing] = useState(false);

	const { data: { order = null } = {}, loading: loadingOrder, error: orderError, refetch, called } = useQuery(LOAD_ORDER, { variables: { id: orderId }, fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true });

	const [cancelOrder, { loading: loadingCancelOrder }] = useMutation(UPDATE_ORDER, { variables: { id: orderId, data: { status: 'canceled' } } });

	const handleCancelOrder = () => {
		Alert.alert(
			'Confirmação',
			'Tem certeza que deseja cancelar esse pedido?',
			[
				{
					text: 'Sim',
					onPress: ()=> {
						cancelOrder()
							.catch((err)=>{
								Alert.alert(
									'Ocorreu um erro',
									getErrorMessage(err)
								)
							})
					}
				},
				{ text: 'Não, manter pedido' }
			]
		)
	}

	function onRefresh() {
		setRefreshing(true);
		refetch()
			.then(()=>setRefreshing(false));
	}

	if (loadingOrder && (!called || !order)) return <LoadingBlock />
	if (orderError) return <ErrorBlock error={getErrorMessage(orderError)} />
	if (!order) return <ErrorBlock error={'Nenhum pedido encontrado'} />

	const statusColor = getStatusColors(order.status);

	return (
		<ScrollView
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}>
			<Container>
				<Chip
					label={getStatusText(order.status)}
					style={{
						root: { backgroundColor: statusColor.background, alignSelf: 'stretch', marginHorizontal: 35 },
						text: { color: statusColor.text  }
					}}
				/>
				
				<BlocksContainer>
					<Blocks order={order} />
				</BlocksContainer>

				<CompanyPanel company={order.company} />
				
				<Paper>
					<Typography variant='title' style={{ marginBottom: 20 }}>Itens</Typography>
					{order.products.map((item, index)=>(
						<Fragment key={item.id}>
							{index > 0 && <Divider />}
							<CartItem item={item} />
						</Fragment>
					))}
				</Paper>
				{order.status === 'waiting' && (
					<Button disabled={loadingCancelOrder} onPress={handleCancelOrder} variant='outlined' style={{ button: { borderColor: palette.error.main }, text: { color: palette.error.main } }}>
						{loadingCancelOrder
							? <ActivityIndicator color='#fff' size='small' />
							: 'Cancelar Pedido'}
					</Button>
				)}
			</Container>
		</ScrollView>
	);
}
