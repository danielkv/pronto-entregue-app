import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Container } from './styles';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import Gateway from '../../gateway';

import { GET_CART, CANCEL_CART } from '../../graphql/cart';
import { CREATE_ORDER } from '../../graphql/orders';
import { sanitizeOrderData, validadeCart } from '../../utils/cart';
import { GET_USER } from '../../graphql/users';
import { getErrors } from '../../utils/errors';

export default function Payment({ navigation }) {
	const { data: cartData, loading: loadingCart, error } = useQuery(GET_CART);
	const { data: userData, loading: loadingUser, error: userError } = useQuery(GET_USER);
	
	const [cancelCart, { loading: loadingCancelCart }] = useMutation(CANCEL_CART);
	const [createOrder, { loading: loadingCreateOrder, error: createOrderError }] = useMutation(CREATE_ORDER);
	
	/* useEffect(() => {
		if (!loadingCart) {
			try {
				validadeCart(cartData);
			} catch (err) {
				Alert.alert(
					'Ocorreu um erro',
					getErrors(err),
					[
						{ text: 'OK', onPress: ()=>navigation.navigate('HomeScreen') }
					],
					{ cancelable: false }
				)
			}
		}
	}); */

	const handleFinishOrder = (cartResult) => {
		const sanitizedCart = sanitizeOrderData({ user: userData.me, ...cartResult });
		
		createOrder({ variables: { data: sanitizedCart } })
			.then(async ({ data }) => {
				await cancelCart();
				navigation.navigate('OrderScreen', data.createOrder.id);
			})
	}
	
	if (loadingCart || loadingUser) return <LoadingBlock />;
	if (loadingCreateOrder || loadingCancelCart) return <LoadingBlock message='Enviando seu pedido' />;
	if (createOrderError) return <ErrorBlock error={createOrderError} />
	if (error) return <ErrorBlock error={error} />
	if (userError) return <ErrorBlock error={userError} />

	return (
		<Container>
			{!!cartData.cartPayment && !!cartData.cartPayment.name && <Gateway step='finish' name={cartData.cartPayment.name} cart={cartData} onFinish={handleFinishOrder} />}
		</Container>
	);
}
