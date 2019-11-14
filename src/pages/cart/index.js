/* eslint-disable no-nested-ternary */
import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks';
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

import { GET_CART_ITEMS, GET_CART_PAYMENT, GET_CART_DELIVERY, SET_CART_DELIVERY, SET_CART_PAYMENT } from '../../graphql/cart';
import { IS_USER_LOGGED_IN } from '../../graphql/authentication';
import { getErrors } from '../../utils/errors';

export default function Cart({ navigation }) {
	const [observations, setObservations] = useState('');
	const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);
	
	const [setDelivery, { loading: loadingSetDelivery }] = useMutation(SET_CART_DELIVERY);
	const [setPayment, { loading: loadingSetPayment }] = useMutation(SET_CART_PAYMENT);
	
	const { data: cartItemsData, loading: loadingCartItems, error } = useQuery(GET_CART_ITEMS);
	const { data: cartDeliveryData, loading: loadingCartDelivery } = useQuery(GET_CART_DELIVERY);
	const { data: cartPaymentData, loading: loadingCartPayment } = useQuery(GET_CART_PAYMENT);
	const { data: userLoggedInData, loading: loadingUser } = useQuery(IS_USER_LOGGED_IN)

	const cartItems = cartItemsData ? cartItemsData.cartItems : [];
	const cartDelivery = cartDeliveryData ? cartDeliveryData.cartDelivery : null;
	const cartPayment = cartPaymentData ? cartPaymentData.cartPayment : null;
	const isUserLoggedIn = userLoggedInData ? userLoggedInData.isUserLoggedIn : false;

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
	})

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
						{cartItems.map((item, index)=><CartItem key={index} item={item} />)}
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
							value={observations}
							onChangeText={(text)=>setObservations(text)}
							multiline
						/>
					</SectionContent>
				</Section>
			</CartContainer>

			<CartButtonContainer>
				<CartButton
					title='Finalizar pedido'
					forceShowPrice
					price={0}
					onPress={()=>{}}
				/>
				<CancelButton>
					<CancelButtonText>Cancelar pedido</CancelButtonText>
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
		

			{/* 
		</View>
			{this.state.deliveryOpen && 
				<Panel ref={(panel)=>{this.deliveryPanel = panel;}} title='Endereço de entrega' headerRight={()=>(
					<TouchableOpacity onPress={() => {NavigationService.navigate('Add_Address', {fromCart:true})}}>
						<Icon type='material-community' name='plus' color='#fff' size={24} />
					</TouchableOpacity>
				)}>
					<DeliveryMethods onSelectItem={(method)=>{
						this.deliveryPanel.close(()=>{
							try {
								let delivery = Cart.setDelivery(method);
								this.setState({delivery, deliveryOpen:false});
							} catch (error) {
								ToastAndroid.show(error.message, ToastAndroid.LONG);
							}
						});
					}} />
				</Panel>
			}

			{this.state.paymentOpen && 
				<Panel ref={(panel)=>{this.paymentPanel = panel;}} title='Forma de Pagamento'>
					<PaymentMethods onSelectItem={(method)=>{
						this.paymentPanel.close(()=>{
							try {
								let payment = Cart.setPayment(method);
								this.setState({payment, paymentOpen:false});
							} catch (error) {
								ToastAndroid.show(error.message, ToastAndroid.SHORT);
							}
						});
					}} />
				</Panel>
			} */}
		</Container>
	);
}
