import React, { useState, useCallback, useMemo } from 'react';
import { Alert, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { vw } from 'react-native-expo-viewport-units';
import Modal from 'react-native-modal';
import { useSafeArea } from 'react-native-safe-area-context';

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/core';

import CartButton from '../../components/CartButton';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import OrderItem from '../../components/OrderItem';

import theme from '../../theme';
import { checkCondition } from '../../utils';
import { calculateOrderPrice, validadeCart } from '../../utils/cart';
import { getErrors } from '../../utils/errors';
import DeliveryModal from './DeliveryModal';
import PaymentModal from './PaymentModal';
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
	CartContainerScroll,
} from './styles';


import { IS_USER_LOGGED_IN } from '../../graphql/authentication';
import {
	SET_CART_DELIVERY,
	SET_CART_PAYMENT,
	REMOVE_CART_ITEM,
	CANCEL_CART,
	GET_CART,
} from '../../graphql/cart';


export default function Cart({ navigation }) {
	const [message, setMessage] = useState('');
	const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);
	const client = useApolloClient();

	const insets = useSafeArea();
	const modalMarginTop = Platform.OS === 'android' ? 0 : insets.top;
	const modalMarginBottom = Platform.OS === 'android' ? 0 : insets.bottom;
	
	const [setDelivery, { loading: loadingDelivery }] = useMutation(SET_CART_DELIVERY);
	const [setPayment, { loading: loadingPayment }] = useMutation(SET_CART_PAYMENT);
	const [removeOrderItem] = useMutation(REMOVE_CART_ITEM);
	const [cancelCart] = useMutation(CANCEL_CART);
	
	const { data: { cartItems, cartDelivery, cartPayment, cartDiscount }, loading: loadingCart, error } = useQuery(GET_CART);
	const { data: userLoggedInData, loading: loadingUser } = useQuery(IS_USER_LOGGED_IN);
	const isUserLoggedIn = userLoggedInData ? userLoggedInData.isUserLoggedIn : false;
	
	const cartPrice = useMemo(()=>{
		const paymentPrice = cartPayment && cartPayment.price ? cartPayment.price : 0;
		const deliveryPrice = cartDelivery && cartDelivery.price ? cartDelivery.price : 0;

		return calculateOrderPrice(cartItems, paymentPrice + deliveryPrice - cartDiscount);
	}, [cartItems, cartDelivery, cartPayment, cartDiscount]);

	const handleOpenDeliveryModal = useCallback(()=>{
		if (isUserLoggedIn) setDeliveryModalOpen(true);
		else navigation.navigate('LoginScreen', { redirect: 'CartScreen' });
	})
	const handleCloseDeliveryModal = useCallback(()=>{
		setDeliveryModalOpen(false);
	});
	
	const handleConfirmDeliveryModal = useCallback((delivery)=>{
		setDeliveryModalOpen(false);
		setDelivery({ variables: { data: delivery } })
			.catch((err) => {
				Alert.alert(getErrors(err));
			});
	})
	const handleOpenPaymentModal = useCallback(()=>{
		if (isUserLoggedIn) setPaymentModalOpen(true);
		else navigation.navigate('LoginScreen', { redirect: 'CartScreen' });
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

	const handleRemoveOrderItem = (item) => () => {
		Alert.alert(
			`Remover ${item.name}`,
			'tem certeza que deseja remover esse item do carrinho',
			[
				{ text: 'Sim', onPress: ()=>removeOrderItem({ variables: { id: item.id } }) },
				{ text: 'Cancelar' },
			]
		);
	}

	const handleFinishCart = () => {
		try {
			validadeCart({ cartItems, cartDelivery, cartPayment });

			client.writeData({ data: { cartMessage: message, cartDiscount, cartPrice } });

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
	
	// navigate to HomeRoutes if there's no items in Cart
	const checkConditionCB = useCallback(() => {
		checkCondition((cartItems && cartItems.length), navigation, 'O carrinho está vazio')
	}, [])
	useFocusEffect(checkConditionCB);
	
	if (loadingCart || loadingUser) return <LoadingBlock />;
	if (error) return <ErrorBlock error={error} />
	
	return (
		<Container>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
				<CartContainerScroll>
					<CartContainer>
						<Section>
							<SectionTitle>
								{`${cartItems.length} ${cartItems.length > 1 ? 'itens' : 'item'}`}
							</SectionTitle>
							<SectionContent>
								{cartItems.map((item, index)=>(
									<OrderItem key={index} item={item} onPressDelete={handleRemoveOrderItem(item)} />
								))}
							</SectionContent>
						</Section>
						<Section>
							<SectionTitle>Entrega e pagamento</SectionTitle>
							<CardContainer disabled={loadingDelivery} onPress={handleOpenDeliveryModal}>
								<CardHeader>
									<Icon type='material-community' name='truck' color={theme.palette.divider} size={24} />
									<CardTitle>Entrega</CardTitle>
									{loadingDelivery && <ActivityIndicator color={theme.palette.divider} size='small' />}
								</CardHeader>
								<CardContent>
									<CardInfo>
										{
											// eslint-disable-next-line no-nested-ternary
											cartDelivery
												? (cartDelivery.type === 'delivery') ? cartDelivery.address.name : 'Retirar no local'
												: 'Nenhum endereço selecionado'
										}
									</CardInfo>
									<Icon type='material-community' name='pencil' color={theme.palette.divider} size={24} />
									{!!(cartDelivery && cartDelivery.price)
										&& <CardPrice>{cartDelivery.price.toFixed(2).replace('.', ',')}</CardPrice>}
								</CardContent>
							</CardContainer>
							<CardContainer disabled={loadingPayment} onPress={handleOpenPaymentModal}>
								<CardHeader>
									<Icon type='material-community' name='credit-card' color={theme.palette.divider} size={24} />
									<CardTitle>Pagamento</CardTitle>
									{loadingPayment && <ActivityIndicator color={theme.palette.divider} size='small' />}
								</CardHeader>
								<CardContent>
									<CardInfo>{cartPayment ? cartPayment.display_name : 'Nenhum pagamento selecionado'}</CardInfo>
									<Icon type='material-community' name='pencil' color={theme.palette.divider} size={20} />
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
				</CartContainerScroll>
			</KeyboardAvoidingView>

			<CartButtonContainer>
				<CartButton
					title='Finalizar pedido'
					forceShowPrice
					price={cartPrice}
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
				style={{ marginLeft: vw(10), marginRight: 0, marginTop: modalMarginTop, marginBottom: modalMarginBottom }}
				swipeDirection='right'
				propagateSwipe
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
				style={{ marginLeft: vw(10), marginRight: 0, marginTop: modalMarginTop, marginBottom: modalMarginBottom }}
				swipeDirection='right'
				propagateSwipe
			>
				<PaymentModal confirmModal={handleConfirmPaymentModal} closeModal={handleClosePaymentModal} />
			</Modal>
		</Container>
	);
}
