import React, { useCallback, useState, useEffect } from 'react';
import { Platform, Alert, Image, View } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useSafeArea } from 'react-native-safe-area-context';

import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core'


import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { useLoggedUserId } from '../../../controller/hooks';
import { sanitizePaymentMethod } from '../../../controller/paymentMethods';
import { Paper, Icon, Typography, Chip } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';
import { getErrorMessage } from '../../../utils/errors';
import { CardHeader, CardContent, CardInfo } from '../styles';
import PaymentModal from './PaymentModal';

import { GET_CART, SET_CART_PAYMENT, GET_CART_USER_CREDITS } from '../../../graphql/cart';
import { GET_USER_CREDITS } from '../../../graphql/users';

export default function DeliveryBlock() {
	const navigation = useNavigation();
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);
	const client = useApolloClient()
	const loggedUserId = useLoggedUserId();

	// modal margins
	const insets = useSafeArea();
	const modalMarginTop = Platform.OS === 'android' ? 0 : insets.top;
	const modalMarginBottom = Platform.OS === 'android' ? 0 : insets.bottom;
	
	const { data: { cartUseCredits } = {} } = useQuery(GET_CART_USER_CREDITS);
	const { data: { cartPayment, cartCompany, cartPrice, cartSubtotal }, error: cartError } = useQuery(GET_CART);
	const { data: { user: { creditBalance = null } = {} } = {}, loading: loadingCredit } = useQuery(GET_USER_CREDITS, { variables: { id: loggedUserId }, fetchPolicy: 'cache-first' });
	const [setPayment, { loading: loadingPayment }] = useMutation(SET_CART_PAYMENT);
	const [creditsUse, setCreditUse] = useState(0);

	useEffect(()=>{
		if (loadingCredit) return;
		let discount = 0;

		if (cartUseCredits) {
			if (creditBalance <= 0) {
				client.writeData({ data: { cartUseCredits: false } })
			} else {
				if (creditBalance >= cartSubtotal) {
					discount = cartSubtotal;
					if (cartPayment?.id) client.writeData({ data: { cartPayment: null } })
				} else {
					discount = creditBalance;
				}
			}
		}
		
		setCreditUse(discount);
		client.writeData({ data: { cartDiscount: discount } })

	}, [cartUseCredits, creditBalance, cartPayment, cartSubtotal]);

	function setUseCredits(newValue) {
		client.writeData({ data: { cartUseCredits: newValue } })
		if (creditBalance < cartPrice && !cartPayment?.id) {
			Alert.alert('O valor do seu pedido é maior que seus créditos', 'Selecione também uma outra forma de pagamento para completar o valor')
		} else {
			if (newValue) setPaymentModalOpen(false);
		}
	}

	const handleOpenPaymentModal = useCallback(()=>{
		if (cartCompany) {
			setPaymentModalOpen(true);
		} else {
			Alert.alert('Ops! Tem algo errado', 'Parece que não há nenhum item na sua cesta', [
				{ text: 'OK', onPress: ()=> navigation.navigate('FeedScreen') }
			])
		}
	})
	const handleClosePaymentModal = useCallback(()=>{
		setPaymentModalOpen(false);
	})

	const handleConfirmPaymentModal = useCallback((payment)=>{
		setPaymentModalOpen(false);
		setPayment({ variables: { data: sanitizePaymentMethod(payment) } })
			.catch((err) => {
				Alert.alert(getErrorMessage(err));
			});
	});

	if (loadingCredit) return <LoadingBlock />
	if (cartError) return <ErrorBlock error={getErrorMessage(cartError)} />
		
	return (
		<>
			<TouchableOpacity disabled={loadingPayment} onPress={handleOpenPaymentModal}>
				<Paper style={{ paddingVertical: 25 }}>
					<CardHeader>
						<Icon name='credit-card' size={20} color='#333' />
						<Typography variant='title' style={{ marginLeft: 10, fontSize: 20 }}>Forma de pagamento</Typography>
						{loadingPayment && <LoadingBlock />}
					</CardHeader>
					
					<CardContent>
						<CardInfo style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
							{cartUseCredits && <Chip label={`Créditos: ${BRL(creditsUse).format()}`} style={{ root: { height: 30 }, text: { fontSize: 13 } }} />}
							{Boolean(cartPrice) &&
								(cartPayment
									? (
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Image source={{ uri: cartPayment.image }} style={{ width: 40, height: 35, resizeMode: 'center' }} />
											<Typography>{cartPayment.displayName}</Typography>
										</View>
									)
									: <Typography>Nenhum pagamento selecionado</Typography>)}
						</CardInfo>
						<Icon name='edit' size={24} color='#333' />
					</CardContent>
				</Paper>
			</TouchableOpacity>
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
				<PaymentModal
					company={cartCompany}
					creditBalance={creditBalance}
					cartUseCredits={cartUseCredits}
					setUseCredits={setUseCredits}
					confirmModal={handleConfirmPaymentModal}
					closeModal={handleClosePaymentModal}
				/>
			</Modal>
		</>
	);
}
