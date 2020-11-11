import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import OrderItem from '../../components/OrderItem';

import { useLoggedUserId } from '../../controller/hooks';
import { Paper, Typography, Divider, Button, useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';

import { GET_USER_ORDERS } from '../../graphql/orders';

export default function OrderList() {
	const loggedUserId = useLoggedUserId();
	const { palette } = useTheme();
	const rowsPerPage = 8;
	const [refreshing, setRefreshing] = useState(false);

	const {
		data: {
			user: { orders = [], countOrders = 0 } = {},
			pageInfo: { page = 0 } = {}
		} = {},
		loading: loadingOrders,
		error: ordersError,
		fetchMore = null,
		called,
		refetch
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

	function onRefresh() {
		setRefreshing(true);
		refetch()
			.finally(() => setRefreshing(false));
	}

	if (loadingOrders && !orders.length && !called) return <LoadingBlock />;
	if (ordersError) return <ErrorBlock error={getErrorMessage(ordersError)} />;

	return (
		<ScrollView
			style={{ flex: 1 }}
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
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
					: (page < (countOrders / rowsPerPage)) && <Button variant='outlined' color='primary' style={{ root: { marginTop: 15 } }} onPress={() => { loadMore(page + 1) }}>Carregar mais</Button>}
			</Paper>
		</ScrollView>
	);
}
