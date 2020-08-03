import React, { useState, useEffect } from 'react';
import { View, ScrollView, Platform, Share, RefreshControl, Alert } from 'react-native';
import Modal from 'react-native-modal';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/core';

import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId, useSelectedCompany } from '../../controller/hooks';
import OrderController from '../../controller/order'
import { Paper, Typography, Button, Chip, Divider, useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import OrderRollItem from './OrderRollItem';
import { CompanyMenuItem } from './styles';

import { CHANGE_ORDER_STATUS } from '../../graphql/orders';
import { GET_ORDER_ROLL } from '../../graphql/orders_roll';
import { GET_USER_COMPANIES, SET_SELECTED_COMPANY } from '../../graphql/users';

export default function OrdersRoll() {
	const { palette } = useTheme();
	const { params: { refetchOrders = false } = {} } = useRoute();
	const navigation = useNavigation();
	const loggedUserId = useLoggedUserId();
	const rowsPerPage = 8;
	const [modalVisible, setModalVisible] = useState(false);
	const [modalStatusVisible, setModalStatusVisible] = useState(false);
	const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const selectedCompany = useSelectedCompany();

	const [setSelectedCompany] = useMutation(SET_SELECTED_COMPANY);
	const [changeOrderStatus] = useMutation(CHANGE_ORDER_STATUS)

	const { data: { company: { orders = [] } = {} } = {}, loading: loadingRollOrders, refetch = null } = useQuery(GET_ORDER_ROLL, { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network',  variables: { companyId: selectedCompany, filter: { status: ['waiting', 'preparing', 'delivering'] }, pagination: { page: 0, rowsPerPage } } });
	const { data: { user: { companies = [] } = {} } = {}, loading: loadingCompanies } = useQuery(GET_USER_COMPANIES, { variables: { id: loggedUserId } });

	useEffect(()=>{
		if (!companies.length) return;

		if (!selectedCompany) setSelectedCompany({ variables: { companyId: companies[0].id } })
	}, [companies])

	useEffect(()=>{
		navigation.setParams({ refetchOrders: false });

		if (!refetchOrders || !selectedCompany) return;

		handleRefetchOrders();
		
	
	}, [refetchOrders])

	function handleRefetchOrders() {
		if (refetch) return refetch();
	}
	
	function onRefresh() {
		if (refetch) {
			setRefreshing(true);
			return refetch().finally(()=>setRefreshing(false))
		}
	}

	async function handleShare() {
		const order = orders[selectedOrder];

		let message = `*PEDIDO #${order.id}* - Endereço de entrega: \n${order.address.street}, n ${order.address.number}\n${order.address.district}\n${order.address.city} - ${order.address.state}\n${order.address.zipcode}\n\nDiga "Pronto, entregue!" quando entregar!`;
		const url = `https://www.google.com/maps/place/${order.address.location[0]},${order.address.location[1]}`;
		if (Platform.OS === 'android') message = message + '\n\n' + url;

		await Share.share({
			message,
			url
		})
	}

	// select company ---------

	function handleSetCompany(itemValue) {
		setSelectedCompany({ variables: { companyId: itemValue } })
			.finally(handleCloseModal)
	}

	function handleOpenModal() {
		setModalVisible(true);
	}
	function handleCloseModal() {
		setModalVisible(false);
	}


	// change order status ---------

	function handleSetStatus(newStatus) {
		const order = orders[selectedOrder];
		setLoadingUpdateStatus(newStatus);
		changeOrderStatus({ variables: { id: order.id, newStatus } })
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro!', getErrorMessage(err));
			})
			.finally(handleCloseModalStatus)
	}

	function handleOpenModalStatus(orderIndex) {
		setSelectedOrder(orderIndex);
		setModalStatusVisible(true);
	}
	function handleCloseModalStatus() {
		setModalStatusVisible(false);
		setTimeout(()=>{
			setSelectedOrder(null);
			setLoadingUpdateStatus(null);
		}, 250);
	}

	if ((loadingRollOrders && !orders.length) || loadingCompanies || !companies.length) return <LoadingBlock />;

	const selectedCompanyName = companies?.find(c => c.id === selectedCompany)?.displayName || '';

	return (
		<ScrollView
			style={{ flex: 1 }}
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<Modal
				isVisible={modalStatusVisible}
				onSwipeComplete={handleCloseModalStatus}
				onBackButtonPress={handleCloseModalStatus}
				onBackdropPress={handleCloseModalStatus}
				onModalHide={handleCloseModalStatus}
				animationIn='slideInRight'
				animationOut='slideOutRight'
				swipeDirection='right'
				style={{ marginHorizontal: 10, height: 200 }}
				propagateSwipe
			>
				<Paper>
					{selectedOrder !== null &&
						<>
							<Chip style={{ root: { height: 30, position: 'absolute', top: -10 } }} label={`#${orders[selectedOrder].id}`} color='secondary' />
							<Typography variant='subtitle'>Alterar status</Typography>
							{OrderController.availableStatus(orders[selectedOrder]).map(status => (
								<Button
									key={status.slug}
									onPress={()=>handleSetStatus(status.slug)}
									variant={status.slug===orders[selectedOrder].status ? 'filled' : 'outlined'}
									color={status.slug===orders[selectedOrder].status ? 'secondary' : 'default'}
									icon={loadingUpdateStatus !== status.slug && status.Icon}
									label={status.label}
								>
									{loadingUpdateStatus === status.slug && <LoadingBlock />}
								</Button>
							))}
							<Divider />
							<Button label='Enviar endereço' variant='outlined' onPress={handleShare} icon='share-2' />
						</>
					}
				</Paper>
			</Modal>
			<View style={{ marginHorizontal: 35 }}>
				{selectedCompany && companies.length > 1
					? (
						<>
							<Button icon='chevron-down' onPress={handleOpenModal} variant='outlined' label={selectedCompanyName} />
							<Modal
								isVisible={modalVisible}
								onSwipeComplete={handleCloseModal}
								onBackButtonPress={handleCloseModal}
								onBackdropPress={handleCloseModal}
								onModalHide={handleCloseModal}
								animationIn='slideInRight'
								animationOut='slideOutRight'
								swipeDirection='right'
								style={{ marginHorizontal: 10, height: 200 }}
								propagateSwipe
							>
								<ScrollView>
									<Paper>
										{companies.map(company =>(
											<CompanyMenuItem selected={selectedCompany===company.id} key={company.id} onPress={()=>handleSetCompany(company.id)}>
												<Typography style={{ textAlign: 'center', fontSize: 16 }}>{company.displayName}</Typography>
											</CompanyMenuItem>
										))}
									</Paper>
								</ScrollView>
							</Modal>
						</>)
					: <Button disabled onPress={handleOpenModal} variant='outlined' label={selectedCompanyName} />
				}
			</View>
			<View style={{ marginHorizontal: 35, marginTop: 20 }}>
				<Typography variant='title'>Pedidos</Typography>
			</View>
			{loadingRollOrders && !refreshing && <LoadingBlock />}
			{orders.map((order, index) => (
				<OrderRollItem key={order.id} orderIndex={index} item={order} handleOpenModalStatus={handleOpenModalStatus}  />
			))}
		</ScrollView>
	);
}