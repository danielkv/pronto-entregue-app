import React, { useCallback } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/core';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import Gateway from '../../gateway';
import { checkCondition } from '../../utils';
import { sanitizeOrderData, validadeCart } from '../../utils/cart';
import { useLoggedUserId, useSelectedAddress } from '../../utils/hooks';
import { Container } from './styles';

import { GET_CART, CANCEL_CART } from '../../graphql/cart';
import { CREATE_ORDER, GET_USER_ORDERS } from '../../graphql/orders';

export default function Payment({ navigation }) {
	const loggedUserId = useLoggedUserId();
	const selectedAddress = useSelectedAddress();
	const { data: cartData, loading: loadingCart, error } = useQuery(GET_CART);
	
	const [cancelCart, { loading: loadingCancelCart }] = useMutation(CANCEL_CART);
	const [createOrder, { loading: loadingCreateOrder, error: createOrderError }] = useMutation(CREATE_ORDER, {
		refetchQueries: [{ query: GET_USER_ORDERS, variables: { id: loggedUserId } }]
	});
	
	const handleFinishOrder = (cartResult) => {
		const sanitizedCart = sanitizeOrderData({ ...cartResult, userId: loggedUserId, address: selectedAddress });
		
		createOrder({ variables: { data: sanitizedCart } })
			.then(async ({ data: { createOrder } }) => {
				navigation.navigate('OrderRoutes', { screen: 'OrderScreen', params: { orderId: createOrder.id } })
				cancelCart();
			})
	}
		
	// navigate to HomeScreen if there's no items in Cart
	useFocusEffect(
		useCallback(() => {
			checkCondition(()=>validadeCart(cartData), navigation)
		}, [])
	);
			
	if (loadingCart) return <LoadingBlock />;
	if (loadingCreateOrder || loadingCancelCart) return <LoadingBlock message='Enviando seu pedido' />;
	if (createOrderError) return <ErrorBlock error={createOrderError} />
	if (error) return <ErrorBlock error={error} />
			
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<Container>
				{(!!cartData.cartPayment && !!cartData.cartPayment.displayName)
					&& <Gateway step='finish' method={cartData.cartPayment} cart={cartData} onFinish={handleFinishOrder} />}
			</Container>
		</KeyboardAvoidingView>
	);
}
				