import React from 'react';
import { Alert, ScrollView } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';

import CartButton from '../../components/CartButton';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId, useSelectedAddress } from '../../controller/hooks';
import { createGateway } from '../../gateway';
import sanitizeOrderData from '../../helpers/sanitizeOrderData';
import { getErrorMessage } from '../../utils/errors';
import { CartButtonContainer } from '../Cart/styles';
import Credits from './Credits';
import { Container } from './styles';

import { GET_CART, CANCEL_CART, GET_CART_USER_CREDITS } from '../../graphql/cart';
import { CREATE_ORDER, GET_USER_ORDERS } from '../../graphql/orders';
import { GET_USER_CREDITS } from '../../graphql/users';

export default function Payment({ navigation }) {
	const loggedUserId = useLoggedUserId();
	const selectedAddress = useSelectedAddress();
	const { data: cartData, loading: loadingCart, error } = useQuery(GET_CART);
	const { data: { cartUseCredits } } = useQuery(GET_CART_USER_CREDITS);
	
	const [cancelCart, { loading: loadingCancelCart }] = useMutation(CANCEL_CART);
	const [createOrder, { loading: loadingCreateOrder }] = useMutation(CREATE_ORDER, {
		refetchQueries: [
			{ query: GET_USER_ORDERS, variables: { id: loggedUserId } },
			{ query: GET_USER_CREDITS, variables: { id: loggedUserId }, skip: !cartUseCredits }
		]
	});

	const Gateway = cartData.cartPayment && createGateway({ cart: cartData, method: cartData.cartPayment })
	
	async function handleFinishOrder () {
		let cartResult = cartData

		if (Gateway && Gateway.onSubmit && typeof Gateway.onSubmit === 'function') {
			cartResult = await Promise.resolve(Gateway.onSubmit())
		}

		const sanitizedCart = sanitizeOrderData({ ...cartResult, userId: loggedUserId, address: selectedAddress })
		
		createOrder({ variables: { data: sanitizedCart } })
			.then(async ({ data: { createOrder } }) => {
				navigation.reset({
					index: 1,
					routes: [
						{ name: 'FeedScreen' },
						{ name: 'OrderScreen', params: { orderId: createOrder.id } }
					]
				})
				cancelCart();
			})
			.catch((err) => {
				Alert.alert('Não foi possível enviar seu pedido', getErrorMessage(err));
			})
	}
			
	if (loadingCart) return <LoadingBlock />;
	if (loadingCreateOrder || loadingCancelCart)return <LoadingBlock size='large' message='Enviando seu pedido' />;
	if (error) return <ErrorBlock error={getErrorMessage(error)} />

	return (
		<Container>
			<ScrollView style={{ flex: 1 }}>
				<Credits cart={cartData} />
				{(!!cartData.cartPayment && !!cartData.cartPayment.displayName) && <Gateway.Page />}
			</ScrollView>

			<CartButtonContainer>
				<CartButton
					title='Finalizar pedido'
					icon='check'
					forceShowPrice
					price={cartData.cartPrice}
					onPress={handleFinishOrder}
				/>
			</CartButtonContainer>
		</Container>
	);
}