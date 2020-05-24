import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { Alert, View, Image } from 'react-native';

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/core';

import CartButton from '../../components/CartButton';
import CartItem from '../../components/CartItem';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { calculateOrderPrice, validateCart } from '../../controller/cart';
import { useKeyboardStatus, useLoggedUserId } from '../../controller/hooks';
import { Button, Paper, Typography, Chip, Divider, TextField, useTheme } from '../../react-native-ui';
import { checkCondition } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import DeliveryBlock from './DeliveryBlock';
import PaymentBlock from './PaymentBlock';
import {
	Container,
	CartButtonContainer,
	CartContainerScroll,
} from './styles';

import {
	REMOVE_CART_ITEM,
	CANCEL_CART,
	GET_CART,
} from '../../graphql/cart';

export default function Cart({ navigation }) {
	const { palette } = useTheme();
	const [message, setMessage] = useState('');
	const loggedUserId = useLoggedUserId();
	const [cartLoading, setCartLoading] = useState(false);
	
	const keyboardOpen = useKeyboardStatus();
	
	const client = useApolloClient();
	
	const [removeOrderItem] = useMutation(REMOVE_CART_ITEM);
	const [cancelCart] = useMutation(CANCEL_CART);
	
	const { data: { cartItems, cartDelivery, cartCompany, cartPayment, cartDiscount, cartPrice }, loading: loadingCart, error } = useQuery(GET_CART);
	
	useEffect(()=>{
		const paymentPrice = cartPayment?.price || 0;
		const deliveryPrice = cartDelivery?.price || 0;

		const subtotal = calculateOrderPrice(cartItems, paymentPrice + deliveryPrice )
		const value =  subtotal - cartDiscount;

		client.writeData({ data: { cartPrice: value, cartSubtotal: subtotal } });
	}, [cartItems, cartDelivery, cartPayment, cartDiscount]);

	const handleRemoveOrderItem = (item) => () => {
		Alert.alert(
			`Remover ${item.name}`,
			'tem certeza que deseja remover esse item da cesta',
			[
				{ text: 'Sim', onPress: () => removeOrderItem({ variables: { id: item.id } }) },
				{ text: 'Cancelar' },
			]
		);
	}

	async function handleFinishCart() {
		try {
			setCartLoading(true);
			if (loggedUserId) {
				await validateCart();
				client.writeData({ data: { cartMessage: message, cartDiscount, cartPrice } });

				navigation.navigate('PaymentScreen');
			} else {
				navigation.navigate('AuthenticationRoutes', { screen: 'LoginScreen', params: {  redirect: 'HomeRoutes', redirectParams: { screen: 'CartScreen' } } });
			}
		} catch (err) {
			if (err.type === 'USER_NO_PHONE_NUMBER')
				Alert.alert(
					'Complete seu cadastro',
					getErrorMessage(err.message),
					[{ text: 'Arrumar isso agora', onPress: ()=>navigation.navigate('ProfileRoutes', { screen: 'SubscriptionScreen', params: { userId: loggedUserId, redirect: { name: 'CartRoutes', params: { screen: 'CartScreen' } } } }) }]
				);
			else
				Alert.alert('Ops, faltou alguma coisa', getErrorMessage(err.message));
		} finally {
			setCartLoading(false);
		}
	}

	const handleCancelCart = () => {
		Alert.alert(
			'Limpar cesta',
			'Tem certeza que deseja limpar sua cesta de itens?',
			[
				{ text: 'Sim', onPress: ()=>cancelCart() },
				{ text: 'Não' },
			]
		);
	}
	
	// navigate to HomeRoutes if there's no items in Cart
	const checkConditionCB = useCallback(() => {
		checkCondition((cartItems && cartItems.length && cartCompany), navigation, 'A cesta está vazia')
	}, [])
	useFocusEffect(checkConditionCB);
	
	if (loadingCart) return <LoadingBlock />;
	if (error) return <ErrorBlock error={getErrorMessage(error)} />
	
	return (
		<Container>
			<CartContainerScroll>
				{cartCompany && <Paper style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image source={{ uri: cartCompany.image }} style={{ width: 60, height: 60, borderRadius: 15, marginRight: 15 }} />
					<Typography style={{ flex: 1, fontSize: 18, color: '#333', fontFamily: 'Roboto-Bold', marginRight: 15 }}>{cartCompany.displayName}</Typography>
					<View style={{ marginLeft: 'auto' }}>
						<Chip color='secondary' label={`${cartItems.length} ${cartItems.length > 1 ? 'itens' : 'item'}`} style={{ root: { height: 30 } }} />
					</View>
				</Paper>}
				<DeliveryBlock />
				<Paper>
					<Typography variant='title'>Itens</Typography>
					<View style={{ marginTop: 35 }}>
						{cartItems.map((item, index)=>(
							<Fragment key={`item_${item.id}_${index}`}>
								{index > 0 && <Divider />}
								<CartItem item={item} onPressDelete={handleRemoveOrderItem(item)} />
							</Fragment>
						))}
					</View>
				</Paper>
				<PaymentBlock />
				<Paper>
					<Typography variant='title'>Observações</Typography>
					<TextField
						style={{
							inputContainer: { backgroundColor: palette.background.main, height: 180 },
						}}
						onChangeText={(text)=>setMessage(text)}
						textAlignVertical='top'
						multiline
						numberOfLines={8}
					/>
				</Paper>
				{Boolean(cartItems && cartCompany) && <Paper>
					<Button variant='filled' style={{ button: { height: 40, backgroundColor: palette.error.main } }} onPress={handleCancelCart}>Limpar Cesta</Button>
					<Typography style={{ color: '#666', textAlign: 'center' }}>Isso irá limpar todos os itens da sua cesta.</Typography>
				</Paper>}
			</CartContainerScroll>
			{!keyboardOpen &&
				(<CartButtonContainer>
					{Boolean(cartCompany?.deliveryTime) && <Typography style={{ marginBottom: 8, textAlign: 'center', color: '#fff', fontSize: 12 }}>{`Previsão de entrega: ${cartCompany.deliveryTime} minutos`}</Typography>}
					{cartLoading
						? <LoadingBlock />
						: <CartButton
							title='Confirmar pedido'
							forceShowPrice
							price={cartPrice}
							onPress={handleFinishCart}
						/>}
					
				</CartButtonContainer>)
			}
		</Container>
	);
}
