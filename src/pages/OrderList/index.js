import React from 'react';
import { View, ScrollView } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import OrderItem from '../../components/OrderItem';

import { Paper, Typography, Divider, Button } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import { useLoggedUserId } from '../../utils/hooks';

import { GET_USER_ORDERS } from '../../graphql/orders';

export default function OrderList() {
	const loggedUserId = useLoggedUserId();
	const rowsPerPage = 8;
	const {
		data: {
			user: { orders = [], countOrders = 0 } = {},
			pageInfo: { page = 0 } = {}
		} = {},
		loading: loadingOrders,
		error: ordersError,
		fetchMore = null
	} = useQuery(GET_USER_ORDERS, { notifyOnNetworkStatusChange: true, variables: { id: loggedUserId, pagination: { page: 0, rowsPerPage } } });

	function loadMore(nexPage) {
		if (!fetchMore) return;

		return fetchMore({
			variables: {
				pagination: {
					page: nexPage,
					rowsPerPage
				}
			},
			updateQuery(prev, { fetchMoreResult }) {
				if (!fetchMoreResult) return prev;

				return Object.assign({}, prev, {
					user: { ...prev.user, orders: [...prev.user.orders, ...fetchMoreResult.user.orders] },
					pageInfo: fetchMoreResult.pageInfo,
				});
			}
		})
	}

	if (loadingOrders && !orders.length) return <LoadingBlock />;
	if (ordersError) return <ErrorBlock error={getErrorMessage(ordersError)} />;

	return (
		<ScrollView style={{ flex: 1 }}>
			<Paper>
				<Typography variant='title' style={{ marginBottom: 20 }}>Meus Pedidos</Typography>
				{orders.map((order, index) => (
					<View key={order.id}>
						{index > 0 && <Divider />}
						<OrderItem item={order} key={index} />
					</View>
				))}
				{loadingOrders
					? <LoadingBlock />
					: (page < (countOrders / rowsPerPage)) && <Button variant='outlined' color='primary' style={{ root: { marginTop: 15 } }} onPress={()=>{loadMore(page+1)}}>Carregar mais</Button>}
			</Paper>
		</ScrollView>
	);
}
