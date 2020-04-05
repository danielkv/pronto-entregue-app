import React from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import Gateway from '../../gateway';
import { sanitizeOrderData } from '../../utils/cart';
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
				navigation.dangerouslyGetParent().reset({
					index: 1,
					routes: [
						{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } },
						{ name: 'OrderRoutes', params: { screen: 'OrderScreen', params: { orderId: createOrder.id } } }
					]
				})
				//navigation.navigate('OrderRoutes', { screen: 'OrderScreen', params: { orderId: createOrder.id } })
				cancelCart();
			})
	}
			
	if (loadingCart) return <LoadingBlock />;
	if (loadingCreateOrder || loadingCancelCart)return <LoadingBlock size='large' message='Enviando seu pedido' />;
	if (createOrderError) return <ErrorBlock error={createOrderError} />
	if (error) return <ErrorBlock error={error} />
			
	return (
		<Container>
			{(!!cartData.cartPayment && !!cartData.cartPayment.displayName)
					&& <Gateway step='finish' method={cartData.cartPayment} cart={cartData} onFinish={handleFinishOrder} />}
		</Container>
	);
}
				