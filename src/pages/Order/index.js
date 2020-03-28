import React, { Fragment } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';

import CartItem from '../../components/CartItem';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { Chip, Paper, Divider, Typography, Button, useTheme } from '../../react-native-ui';
import { getStatusText, getStatusColors } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import Blocks from './Blocks';
import {
	Container,
	ContainerScroll,
	BlocksContainer
} from './styles';

import { LOAD_ORDER, UPDATE_ORDER } from '../../graphql/orders';

export default function Order() {
	const { params: { orderId } } = useRoute();
	const { palette } = useTheme();

	const { data: { order = null } = {}, loading: loadingOrder, error: orderError } = useQuery(LOAD_ORDER, { variables: { id: orderId } });

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

	if (loadingOrder) return <LoadingBlock />
	if (orderError) return <ErrorBlock error={getErrorMessage(orderError)} />

	const statusColor = getStatusColors(order.status);

	return (
		<ContainerScroll>
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
		</ContainerScroll>
	);
}
