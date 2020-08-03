import React, { Fragment, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, RefreshControl, View } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import moment from 'moment';

import CartItem from '../../components/CartItem';
import CompanyPanel from '../../components/CompanyPanel';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import OrderController from '../../controller/order';
import { Chip, Paper, Divider, Typography, Button, useTheme, Icon } from '../../react-native-ui';
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

	const { data: { order = null } = {}, loading: loadingOrder, error: orderError, refetch } = useQuery(LOAD_ORDER, { variables: { id: orderId }, notifyOnNetworkStatusChange: true });

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
			.finally(()=>setRefreshing(false));
	}

	if (loadingOrder) return <LoadingBlock />
	if (orderError) return <ErrorBlock error={getErrorMessage(orderError)} />
	if (!order) return <ErrorBlock error={'Nenhum pedido encontrado'} />

	const statusColor = OrderController.statusColors(order.status);

	return (
		<ScrollView
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}>
			<Container>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<Icon name='chevron-down' size={15} color={palette.background.dark} />
					<Typography style={{ fontSize: 12, color: palette.background.dark }}>Arraste para atualizar</Typography>
				</View>
				<Chip
					label={OrderController.statusLabel(order.status)}
					style={{
						root: { backgroundColor: statusColor.background, alignSelf: 'stretch', marginHorizontal: 35 },
						text: { color: statusColor.text }
					}}
				/>

				{Boolean(order.scheduledTo) && (
					<View style={{
						flexDirection: 'row',
						alignItems: 'flex-start',
						backgroundColor: '#fff',
						padding: 13,
						borderRadius: 15,
						marginHorizontal: 35,
						marginTop: 10,
						marginBottom: -5
					}}>
						<Icon name='calendar' type='material-community' color='#333' style={{ root: { marginTop: 0 } }} />
						<View style={{
							marginLeft: 8
						}}>
							<Typography style={{ fontFamily: 'Roboto-Bold', color: '#333' }}>Este pedido foi agendado</Typography>
							<Typography style={{ color: '#555' }}>{`Dia: ${moment(order.scheduledTo).format('DD/MM/YYYY')}`}</Typography>
							<Typography style={{ color: '#555' }}>{`Horário aprox.: ${moment(order.scheduledTo).format('HH:mm')}`}</Typography>
						</View>
					</View>
				)}
				
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
