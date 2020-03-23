import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Text } from 'react-native-elements';

import { useQuery, useMutation } from '@apollo/react-hooks';

import CartItem from '../../components/CartItem';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { getStatusText } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import Blocks from './Blocks';
import {
	Container,
	ContainerScroll,
	BlocksContainer,
	OrderItems,
	ItemsContainer,
	CancelButton,
	CancelButtonText,
	StatusCard,
	StatusCardText,
} from './styles';

import { LOAD_ORDER, UPDATE_ORDER } from '../../graphql/orders';

export default function Order({ route }) {
	const { order_id } = route.params;

	const { data: orderData, loading: loadingOrder, error: orderError } = useQuery(LOAD_ORDER, { variables: { id: order_id } });
	const order = orderData && orderData.order ? orderData.order : null;

	const [cancelOrder, { loading: loadingCancelOrder }] = useMutation(UPDATE_ORDER, { variables: { id: order_id, data: { status: 'canceled' } } });

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
	if (orderError) return <ErrorBlock error={orderError} />

	return (
		<ContainerScroll>
			<Container>
				<StatusCard status={order.status}>
					<StatusCardText status={order.status}>{getStatusText(order.status)}</StatusCardText>
				</StatusCard>
				<BlocksContainer>
					<Blocks order={order} />
				</BlocksContainer>
				<OrderItems>
					<Text h3>{`${order.products.length} ${order.products.length > 1 ? 'itens' : 'item'}`}</Text>
					<ItemsContainer>
						{order.products.map((item, index)=>(
							<CartItem key={index} item={item} />
						))}
					</ItemsContainer>
				</OrderItems>
				{order.status === 'waiting' && (
					<CancelButton disabled={loadingCancelOrder} onPress={handleCancelOrder}>
						{loadingCancelOrder
							? <ActivityIndicator color='#fff' size='small' />
							: <CancelButtonText h2>Cancelar Pedido</CancelButtonText>}
					</CancelButton>
				)}
			</Container>
		</ContainerScroll>
	);
}
