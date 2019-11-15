/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { vw } from 'react-native-expo-viewport-units';

import CartButton from '../../components/cartButton';
import {
	Container,
	CartContainer,
	Section,
	SectionTitle,
	SectionContent,
	CardContainer,
	CardHeader,
	CardContent,
	CardTitle,
	CardInfo,
	CardPrice,
	CartButtonContainer,
	CancelButton,
	CancelButtonText,
} from './styles';
import theme from '../../theme';
import CartItem from './cartItem';
import LoadingBlock from '../../components/loadingBlock';
import ErrorBlock from '../../components/errorBlock';

import DeliveryModal from './deliveryModal';
import PaymentModal from './paymentModal';

import {
	GET_CART_ITEMS,
	GET_CART_PAYMENT,
	GET_CART_DELIVERY,
	SET_CART_DELIVERY,
	SET_CART_PAYMENT,
	REMOVE_CART_ITEM,
	CANCEL_CART,
} from '../../graphql/cart';

import { IS_USER_LOGGED_IN } from '../../graphql/authentication';
import { getErrors } from '../../utils/errors';
import { calculateOrderPrice, validadeCart } from '../../utils/cart';

export default function Cart({ navigation }) {
	const [message, setMessage] = useState('');
	const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);
	const client = useApolloClient();
	
	const [setDelivery, { loading: loadingSetDelivery }] = useMutation(SET_CART_DELIVERY);
	const [setPayment, { loading: loadingSetPayment }] = useMutation(SET_CART_PAYMENT);
	const [removeCartItem, { loading: loadingRemoveCartItem }] = useMutation(REMOVE_CART_ITEM);
	const [cancelCart, { loading: loadingCancelCart }] = useMutation(CANCEL_CART);
	
	const { data: cartItemsData, loading: loadingCartItems, error } = useQuery(GET_CART_ITEMS);
	const { data: cartDeliveryData, loading: loadingCartDelivery } = useQuery(GET_CART_DELIVERY);
	const { data: cartPaymentData, loading: loadingCartPayment } = useQuery(GET_CART_PAYMENT);
	const { data: userLoggedInData, loading: loadingUser } = useQuery(IS_USER_LOGGED_IN)

	const cartItems = cartItemsData ? [...cartItemsData.cartItems] : [];
	const cartDelivery = cartDeliveryData ? cartDeliveryData.cartDelivery : null;
	const cartPayment = cartPaymentData ? cartPaymentData.cartPayment : null;
	const isUserLoggedIn = userLoggedInData ? userLoggedInData.isUserLoggedIn : false;
	const discount = 0;

	const orderPrice = useMemo(()=>{
		const paymentPrice = cartPayment && cartPayment.price ? cartPayment.price : 0;
		const deliveryPrice = cartDelivery && cartDelivery.price ? cartDelivery.price : 0;

		return calculateOrderPrice(cartItems, paymentPrice + deliveryPrice - discount);
	}, [cartItems, cartDelivery, cartPayment, discount]);

	const handleOpenDeliveryModal = useCallback(()=>{
		if (isUserLoggedIn) setDeliveryModalOpen(true);
		else navigation.navigate('LoginScreen');
	})
	const handleCloseDeliveryModal = useCallback(()=>{
		setDeliveryModalOpen(false);
	})
	const handleConfirmDeliveryModal = useCallback((delivery)=>{
		setDeliveryModalOpen(false);
		setDelivery({ variables: { data: delivery } })
			.catch((err) => {
				Alert.alert(getErrors(err));
			});
	})
	const handleOpenPaymentModal = useCallback(()=>{
		if (isUserLoggedIn) setPaymentModalOpen(true);
		else navigation.navigate('LoginScreen');
	})
	const handleClosePaymentModal = useCallback(()=>{
		setPaymentModalOpen(false);
	})
	const handleConfirmPaymentModal = useCallback((payment)=>{
		setPaymentModalOpen(false);
		setPayment({ variables: { data: payment } })
			.catch((err) => {
				Alert.alert(getErrors(err));
			});
	});

	const handleRemoveCartItem = (item) => () => {
		Alert.alert(
			`Remover ${item.name}`,
			'tem certeza que deseja remover esse item do carrinho',
			[
				{ text: 'Sim', onPress: ()=>removeCartItem({ variables: { id: item.id } }) },
				{ text: 'Cancelar' },
			]
		);
	}

	const handleFinishCart = () => {
		try {
			validadeCart(cartItems, cartDelivery, cartPayment);

			client.writeData({ data: { cartMessage: message } });

			navigation.navigate('PaymentScreen');
		} catch (err) {
			Alert.alert(err.message);
		}
	}

	const handleCancelCart = () => {
		Alert.alert(
			'Cancelar pedido',
			'Tem certeza que deseja cancelar o pedido atual',
			[
				{ text: 'Sim', onPress: ()=>cancelCart() },
				{ text: 'Cancelar' },
			]
		);
	}


	if (loadingCartItems || loadingCartDelivery || loadingCartPayment || loadingUser) return <LoadingBlock />;
	if (error) return <ErrorBlock error={error} />

	return (
		<Container>
			<CartContainer>
				<Section>
					<SectionTitle>
						{`${cartItems.length} ${cartItems.length > 1 ? 'itens' : 'item'}`}
					</SectionTitle>
					<SectionContent>
						{cartItems.map((item, index)=>(
							<CartItem key={index} item={item} onPressDelete={handleRemoveCartItem(item)} />
						))}
					</SectionContent>
				</Section>
				<Section>
					<SectionTitle>Entrega e pagamento</SectionTitle>
					<CardContainer onPress={handleOpenDeliveryModal}>
						<CardHeader>
							<Icon type='material-community' name='truck' color={theme.colors.divider} size={24} />
							<CardTitle>Entrega</CardTitle>
						</CardHeader>
						<CardContent>
							<CardInfo>
								{
									cartDelivery
										? (cartDelivery.type === 'delivery') ? cartDelivery.address.name : 'Retirar no local'
										: 'Nenhum endereço selecionado'
								}
							</CardInfo>
							<Icon type='material-community' name='pencil' color={theme.colors.divider} size={24} />
							{!!(cartDelivery && cartDelivery.price) && <CardPrice>{cartDelivery.price.toFixed(2).replace('.', ',')}</CardPrice>}
						</CardContent>
					</CardContainer>
					<CardContainer onPress={handleOpenPaymentModal}>
						<CardHeader>
							<Icon type='material-community' name='credit-card' color={theme.colors.divider} size={24} />
							<CardTitle>Pagamento</CardTitle>
						</CardHeader>
						<CardContent>
							<CardInfo>{cartPayment ? cartPayment.display_name : 'Nenhum pagamento selecionado'}</CardInfo>
							<Icon type='material-community' name='pencil' color={theme.colors.divider} size={20} />
						</CardContent>
					</CardContainer>
				</Section>
				<Section>
					<SectionTitle>Observações</SectionTitle>
					<SectionContent>
						<Input
							value={message}
							onChangeText={(text)=>setMessage(text)}
							multiline
						/>
					</SectionContent>
				</Section>
			</CartContainer>

			<CartButtonContainer>
				<CartButton
					title='Finalizar pedido'
					forceShowPrice
					price={orderPrice}
					onPress={handleFinishCart}
				/>
				<CancelButton>
					<CancelButtonText onPress={handleCancelCart}>Cancelar pedido</CancelButtonText>
				</CancelButton>
			</CartButtonContainer>
			
			<Modal
				isVisible={deliveryModalOpen}
				onModalHide={handleCloseDeliveryModal}
				onSwipeComplete={handleCloseDeliveryModal}
				onBackButtonPress={handleCloseDeliveryModal}
				onBackdropPress={handleCloseDeliveryModal}
				animationIn='slideInRight'
				animationOut='slideOutRight'
				style={{ marginLeft: vw(10), marginRight: 0, marginVertical: 0 }}
				swipeDirection='right'
			>
				<DeliveryModal confirmModal={handleConfirmDeliveryModal} closeModal={handleCloseDeliveryModal} />
			</Modal>

			<Modal
				isVisible={paymentModalOpen}
				onModalHide={handleClosePaymentModal}
				onSwipeComplete={handleClosePaymentModal}
				onBackButtonPress={handleClosePaymentModal}
				onBackdropPress={handleClosePaymentModal}
				animationIn='slideInRight'
				animationOut='slideOutRight'
				style={{ marginLeft: vw(10), marginRight: 0, marginVertical: 0 }}
				swipeDirection='right'
			>
				<PaymentModal confirmModal={handleConfirmPaymentModal} closeModal={handleClosePaymentModal} />
			</Modal>
		</Container>
	);
}
