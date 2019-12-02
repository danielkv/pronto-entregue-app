import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Container, ContainerScroll } from './styles';
import LoadingBlock from '../../components/LoadingBlock';
import Order from './Order';

import { GET_USER_ORDERS } from '../../graphql/orders';
import { LOGGED_USER_ID } from '../../graphql/authentication';

export default function OrderList() {
	const { data: loggedUserIdData } = useQuery(LOGGED_USER_ID);
	const { data: ordersData, loading: loadingOrders } = useQuery(GET_USER_ORDERS, { variables: { id: loggedUserIdData.loggedUserId } });
	const orders = ordersData && ordersData.user ? ordersData.user.orders : [];

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
