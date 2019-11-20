/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { vw } from 'react-native-expo-viewport-units';

import CartButton from '../../components/CartButton';
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
import OrderItem from '../../components/OrderItem';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';

import DeliveryModal from './deliveryModal';
import PaymentModal from './paymentModal';

import {
	SET_CART_DELIVERY,
	SET_CART_PAYMENT,
	REMOVE_CART_ITEM,
	CANCEL_CART,
	GET_CART,
} from '../../graphql/cart';

import { IS_USER_LOGGED_IN } from '../../graphql/authentication';
import { getErrors } from '../../utils/errors';
import { calculateOrderPrice, validadeCart } from '../../utils/cart';

export default function Cart({ navigation }) {
	const [message, setMessage] = useState('');
	const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);
	const client = useApolloClient();
	
	const [setDelivery] = useMutation(SET_CART_DELIVERY);
	const [setPayment] = useMutation(SET_CART_PAYMENT);
	const [removeOrderItem] = useMutation(REMOVE_CART_ITEM);
	const [cancelCart] = useMutation(CANCEL_CART);
	
	const { data: { OrderItems, cartDelivery, cartPayment, cartDiscount }, loading: loadingCart, error } = useQuery(GET_CART);
	const { data: userLoggedInData, loading: loadingUser } = useQuery(IS_USER_LOGGED_IN);
	const isUserLoggedIn = userLoggedInData ? userLoggedInData.isUserLoggedIn : false;

	const cartPrice = useMemo(()=>{
		const paymentPrice = cartPayment && cartPayment.price ? cartPayment.price : 0;
		const deliveryPrice = cartDelivery && cartDelivery.price ? cartDelivery.price : 0;

		return calculateOrderPrice(OrderItems, paymentPrice + deliveryPrice - cartDiscount);
	}, [OrderItems, cartDelivery, cartPayment, cartDiscount]);

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
			validadeCart({ OrderItems, cartDelivery, cartPayment });

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


	if (loadingCart || loadingUser) return <LoadingBlock />;
	if (error) return <ErrorBlock error={error} />

	return (
		<Container>
			<CartContainer>
				<Section>
					<SectionTitle>
						{`${OrderItems.length} ${OrderItems.length > 1 ? 'itens' : 'item'}`}
					</SectionTitle>
					<SectionContent>
						{OrderItems.map((item, index)=>(
							<OrderItem key={index} item={item} onPressDelete={handleRemoveOrderItem(item)} />
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
