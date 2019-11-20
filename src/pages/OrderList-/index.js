import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Container, ContainerScroll } from './styles';
import LoadingBlock from '../../components/LoadingBlock';
import Order from './order';

import { GET_USER_ORDERS } from '../../graphql/orders';

export default function OrderList() {
	const { data: ordersData, loading: loadingOrders } = useQuery(GET_USER_ORDERS);
	const orders = ordersData && ordersData.me ? ordersData.me.orders : [];

	if (loadingOrders) return <LoadingBlock />;

	return (
		<ContainerScroll>
			<Container>
				{orders.map((order, index) => (
					<Order order={order} key={index} />
				))}
			</Container>
		</ContainerScroll>
	);
}
