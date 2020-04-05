import React, { useCallback, useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { View } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useSafeArea } from 'react-native-safe-area-context';

import { useMutation, useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { Paper, Icon, Typography } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';
import { getErrorMessage, extractFirstError } from '../../../utils/errors';
import { useSelectedAddress } from '../../../utils/hooks';
import { CardHeader, CardContent, CardInfo } from '../styles';
import DeliveryModal from './DeliveryModal';

import { GET_CART, SET_CART_DELIVERY } from '../../../graphql/cart';

export default function DeliveryBlock() {
	const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
	const selectedAddress = useSelectedAddress();

	// modal margins
	const insets = useSafeArea();
	const modalMarginTop = Platform.OS === 'android' ? 0 : insets.top;
	const modalMarginBottom = Platform.OS === 'android' ? 0 : insets.bottom;

	const { data: { cartDelivery, cartCompany }, error: cartError } = useQuery(GET_CART);
	const [setDelivery, { loading: loadingDelivery }] = useMutation(SET_CART_DELIVERY);

	const handleOpenDeliveryModal = useCallback(()=>{
		setDeliveryModalOpen(true);
	})
	const handleCloseDeliveryModal = useCallback(()=>{
		setDeliveryModalOpen(false);
	});

	const handleConfirmDeliveryModal = useCallback(({ type, address, force=false }) => {
		setDeliveryModalOpen(false);
		setDelivery({ variables: { type, address, force } })
			.catch((err) => {
				const error = extractFirstError(err);
				if (error.code === 'DELIVERY_LOCATION') {
					Alert.alert(error.message, 'Realmente deseja alterar o endereço e limpar a cesta?', [
						{ text: 'Sim', onPress: ()=>handleConfirmDeliveryModal({ type, address, force: true }) },
						{ text: 'Não' }
					])
				} else {
					Alert.alert(error.message);
				}
			});
	})

	useEffect(()=>{
		if (cartCompany?.id && !loadingDelivery) handleConfirmDeliveryModal({ type: 'delivery', address: selectedAddress })
	}, [])

	if (cartError) return <ErrorBlock error={getErrorMessage(cartError)} />
		
	return (
		<View>
			<TouchableOpacity disabled={loadingDelivery} onPress={handleOpenDeliveryModal}>
				<Paper style={{ paddingVertical: 25 }}>
					<CardHeader>
						<Icon name='map-pin' size={20} color='#333' />
						<Typography variant='title' style={{ marginLeft: 10, fontSize: 20 }}>Endereço de Entrega</Typography>
						{loadingDelivery && <LoadingBlock />}
					</CardHeader>
					<CardContent>
						<CardInfo>
							<Typography>
								{
									cartDelivery
										? (cartDelivery.type === 'delivery') ? selectedAddress.name : 'Retirar no local'
										: 'Nenhum endereço selecionado'
								}
							</Typography>
						</CardInfo>
						<Icon name='edit' size={24} color='#333' />
						{!!(cartDelivery && cartDelivery.price)
							&& <Typography>{BRL(cartDelivery.price).format()}</Typography>}
					</CardContent>
				</Paper>
			</TouchableOpacity>
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
				propagateSwipe={false}
			>
				<DeliveryModal confirmModal={handleConfirmDeliveryModal} closeModal={handleCloseDeliveryModal} />
			</Modal>
		</View>
	);
}
