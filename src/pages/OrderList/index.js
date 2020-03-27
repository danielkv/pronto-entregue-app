import React, { Fragment } from 'react';
import { ScrollView } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import LoadingBlock from '../../components/LoadingBlock';
import OrderItem from '../../components/OrderItem';

import { Paper, Typography, Divider } from '../../react-native-ui';
import { useLoggedUserId } from '../../utils/hooks';

import { GET_USER_ORDERS } from '../../graphql/orders';

export default function OrderList() {
	const loggedUserId = useLoggedUserId();
	const { data: ordersData, loading: loadingOrders } = useQuery(GET_USER_ORDERS, { variables: { id: loggedUserId } });
	const orders = ordersData && ordersData.user ? ordersData.user.orders : [];

	if (loadingOrders) return <LoadingBlock />;

	return (
		<ScrollView>
			<Paper>
				<Typography variant='title' style={{ marginBottom: 20 }}>Meus Pedidos</Typography>
				{orders.map((order, index) => (
					<Fragment key={order.id}>
						{index > 0 && <Divider />}
						<OrderItem item={order} key={index} />
					</Fragment>
				))}
			</Paper>
		</ScrollView>
	);
}
