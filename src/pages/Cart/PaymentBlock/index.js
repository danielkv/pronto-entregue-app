import React, { useCallback, useState } from 'react';
import { Platform, Alert } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useSafeArea } from 'react-native-safe-area-context';

import { useMutation, useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { Paper, Icon, Typography } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';
import { CardHeader, CardContent, CardInfo } from '../styles';
import PaymentModal from './PaymentModal';

import { GET_CART, SET_CART_PAYMENT } from '../../../graphql/cart';

export default function DeliveryBlock() {
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);

	// modal margins
	const insets = useSafeArea();
	const modalMarginTop = Platform.OS === 'android' ? 0 : insets.top;
	const modalMarginBottom = Platform.OS === 'android' ? 0 : insets.bottom;
	
	const { data: { cartPayment, cartCompany }, error: cartError } = useQuery(GET_CART);
	const [setPayment, { loading: loadingPayment }] = useMutation(SET_CART_PAYMENT);

	const handleOpenPaymentModal = useCallback(()=>{
		setPaymentModalOpen(true);
	})
	const handleClosePaymentModal = useCallback(()=>{
		setPaymentModalOpen(false);
	})

	const handleConfirmPaymentModal = useCallback((payment)=>{
		setPaymentModalOpen(false);
		setPayment({ variables: { data: payment } })
			.catch((err) => {
				Alert.alert(getErrorMessage(err));
			});
	});

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
						<CardInfo>
							{cartPayment?.displayName || 'Nenhum pagamento selecionado'}
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
				<PaymentModal company={cartCompany} confirmModal={handleConfirmPaymentModal} closeModal={handleClosePaymentModal} />
			</Modal>
		</>
	);
}
