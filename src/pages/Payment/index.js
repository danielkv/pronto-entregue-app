import React, { useCallback } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/core';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import Gateway from '../../gateway';
import { checkCondition } from '../../utils';
import { sanitizeOrderData, validadeCart } from '../../utils/cart';
import { Container } from './styles';

import { LOGGED_USER_ID } from '../../graphql/authentication';
import { GET_CART, CANCEL_CART } from '../../graphql/cart';
import { CREATE_ORDER, GET_USER_ORDERS } from '../../graphql/orders';
import { GET_USER } from '../../graphql/users';

export default function Payment({ navigation }) {
	const { data: cartData, loading: loadingCart, error } = useQuery(GET_CART);
	const { data: { loggedUserId } } = useQuery(LOGGED_USER_ID);
	const { data: userData, loading: loadingUser, error: userError } = useQuery(GET_USER, { variables: { id: loggedUserId } });
	
	const [cancelCart, { loading: loadingCancelCart }] = useMutation(CANCEL_CART);
	const [createOrder, { loading: loadingCreateOrder, error: createOrderError }] = useMutation(CREATE_ORDER, {
		refetchQueries: [{ query: GET_USER_ORDERS, variables: { id: loggedUserId } }]
	});

	const handleFinishOrder = (cartResult) => {
		const sanitizedCart = sanitizeOrderData({ user: userData.user, ...cartResult });
		
		createOrder({ variables: { data: sanitizedCart } })
			.then(async ({ data }) => {
				navigation.reset({
					index: 0,
					routes: [{ name: 'HomeScreen' }, { name: 'OrderScreen', params: { order_id: data.createOrder.id } }]
				});
				cancelCart();
			})
	}

	// navigate to HomeScreen if there's no items in Cart
	useFocusEffect(
		useCallback(() => {
			checkCondition(()=>validadeCart(cartData), navigation)
		}, [])
	);
	
	if (loadingCart || loadingUser) return <LoadingBlock />;
	if (loadingCreateOrder || loadingCancelCart) return <LoadingBlock message='Enviando seu pedido' />;
	if (createOrderError) return <ErrorBlock error={createOrderError} />
	if (error) return <ErrorBlock error={error} />
	if (userError) return <ErrorBlock error={userError} />

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<Container>
				{(!!cartData.cartPayment && !!cartData.cartPayment.name)
					&& <Gateway step='finish' name={cartData.cartPayment.name} cart={cartData} onFinish={handleFinishOrder} />}
			</Container>
		</KeyboardAvoidingView>
	);
}
