import React, { Fragment, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, RefreshControl, View } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import moment from 'moment';

import CartItem from '../../components/CartItem';
import CompanyPanel from '../../components/CompanyPanel';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { Chip, Paper, Divider, Typography, Button, useTheme, Icon } from '../../react-native-ui';
import { getOrderStatusLabel, getStatusColors } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import Blocks from './Blocks';
import {
	Container,
	BlocksContainer
} from './styles';

import { LOAD_ORDER, CANCEL_ORDER } from '../../graphql/orders';

export default function Order() {
	const { params: { orderId } } = useRoute();
	const { palette } = useTheme();
	const [refreshing, setRefreshing] = useState(false);

	const { data: { order = null } = {}, loading: loadingOrder, error: orderError, refetch, called } = useQuery(LOAD_ORDER, { variables: { id: orderId }, notifyOnNetworkStatusChange: true });

	const [cancelOrder, { loading: loadingCancelOrder }] = useMutation(CANCEL_ORDER, { variables: { id: orderId } });

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

	const now = moment();
	const deliver = moment(order.createdAt).add(order.deliveryTime, 'm');
	const forecast = order.deliveryTime ? now.to(deliver) : null;
	const anyMinute = deliver.diff(now, 'm') < 0 ? true : false;

	return (
		<ScrollView
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}>
			<Container>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<Icon name='chevron-down' size={15} color={palette.background.dark} />
					<Typography style={{ fontSize: 12, color: palette.background.dark }}>Arraste para atualizar</Typography>
				</View>
				<Chip
					label={getOrderStatusLabel(order)}
					style={{
						root: { backgroundColor: statusColor.background, alignSelf: 'stretch', marginHorizontal: 35 },
						text: { color: statusColor.text  }
					}}
				/>
				{order.status === 'waiting' && forecast && <Chip
					style={{
						root: { backgroundColor: '#fff', alignSelf: 'stretch', marginHorizontal: 35 },
						text: { color: '#333', fontSize: 14 }
					}}
					label={anyMinute ? 'Em qualquer momento' : `Aproximadamente ${forecast}`} />}
				
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
				
				{Boolean(order.message) && <Paper>
					<Typography variant='title' style={{ marginBottom: 20 }}>Observações</Typography>
					<Typography variant='text'>{order.message}</Typography>
				</Paper>}

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
