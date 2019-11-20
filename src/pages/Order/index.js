import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';

import LoadingBlock from '../../components/loadingBlock';
import ErrorBlock from '../../components/errorBlock';
import {
	Container,
	ContainerScroll,
	BlocksContainer,
	OrderItems,
	ItemsContainer,
	CancelButton,
	CancelButtonText,
	StatusCard,
} from './styles';

import Blocks from './Blocks';
import OrderItem from '../../components/OrderItem';

import { LOAD_ORDER, UPDATE_ORDER } from '../../graphql/orders';
import { getStatusText } from '../../utils';
import { getErrors } from '../../utils/errors';

export default function Order() {
	const route = useRoute();
	const { order_id } = route.params;

	const { data: orderData, loading: loadingOrder, error: orderError } = useQuery(LOAD_ORDER, { variables: { id: order_id } });
	const order = orderData && orderData.order ? orderData.order : null;

	const [cancelOrder, { loading: loadingCancelOrder }] = useMutation(UPDATE_ORDER, { variables: { id: order_id, data: { status: 'canceled' } } });

	const handleCancelOrder = () => {
		cancelOrder()
			.catch((err)=>{
				Alert.alert(
					'Ocorreu um erro',
					getErrors(err)
				)
			})
	}

	if (loadingOrder) return <LoadingBlock />
	if (orderError) return <ErrorBlock error={orderError} />

	return (
		<ContainerScroll>
			<Container>
				<StatusCard status={order.status}>{getStatusText(order.status)}</StatusCard>
				<BlocksContainer>
					<Blocks order={order} />
				</BlocksContainer>
				<OrderItems>
					<Text h3>{`${order.products.length} ${order.products.length > 1 ? 'itens' : 'item'}`}</Text>
					<ItemsContainer>
						{order.products.map((item, index)=>(
							<OrderItem key={index} item={item} />
						))}
					</ItemsContainer>
				</OrderItems>
				{order.status === 'waiting' && (
					<CancelButton disabled={loadingCancelOrder} onPress={handleCancelOrder}>
						{loadingCancelOrder
							? <ActivityIndicator color='#fff' />
							: <CancelButtonText h2>Cancelar Pedido</CancelButtonText>}
					</CancelButton>
				)}
			</Container>
		</ContainerScroll>
	);
}
