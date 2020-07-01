import React, { useCallback, useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { View } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useSafeArea } from 'react-native-safe-area-context';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { useSelectedAddress } from '../../../controller/hooks';
import { Paper, Icon, Typography, Chip } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';
import { getErrorMessage, extractFirstError } from '../../../utils/errors';
import { CardHeader, CardContent, CardInfo } from '../styles';
import DeliveryModal from './DeliveryModal';

import { GET_CART, SET_CART_DELIVERY, CANCEL_CART } from '../../../graphql/cart';

export default function DeliveryBlock() {
	const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
	const selectedAddress = useSelectedAddress();
	const navigation = useNavigation();

	// modal margins
	const insets = useSafeArea();
	const modalMarginTop = Platform.OS === 'android' ? 0 : insets.top;
	const modalMarginBottom = Platform.OS === 'android' ? 0 : insets.bottom;

	
	const { data: { cartDelivery, cartCompany, cartCoupon }, error: cartError } = useQuery(GET_CART);

	const pickupOnly = cartCompany?.delivery && !cartCompany?.pickup;

	const [setDelivery, { loading: loadingDelivery }] = useMutation(SET_CART_DELIVERY);
	const [cancelCart] = useMutation(CANCEL_CART);

	const handleOpenDeliveryModal = ()=>{
		setDeliveryModalOpen(true);
	}
	const handleCloseDeliveryModal = useCallback(()=>{
		setDeliveryModalOpen(false);
	});

	function handleConfirmDeliveryModal({ type, address, force=false }) {
		if (force && pickupOnly) return cancelCart();

		return setDelivery({ variables: { type, address, force } })
			.then(()=>{
				setDeliveryModalOpen(false)
			})
			.catch((err) => {
				const error = extractFirstError(err);
				if (error.code === 'DELIVERY_LOCATION') {
					if (cartCompany.pickup){
						Alert.alert(error.message, 'Deseja retirar o pedido no balcão ou limpar sua cesta?', [
							{ text: 'Retirar no balcão', onPress: ()=>handleConfirmDeliveryModal({ type: 'takeout' }) },
							{ text: 'Limpar cesta', onPress: ()=>handleConfirmDeliveryModal({ type, address, force: true }).then(()=>navigation.navigate('FeedScreen')) },
						])
					} else {
						Alert.alert(error.message, 'Realmente deseja alterar o endereço e limpar a cesta?', [
							{ text: 'Sim', onPress: ()=>handleConfirmDeliveryModal({ type, address, force: true }).then(()=>navigation.navigate('FeedScreen')) },
							{ text: 'Não' }
						])
					}
				} else {
					Alert.alert(error.message);
				}
			});
	}

	useEffect(()=>{
		if (!cartCompany?.id || loadingDelivery) return;

		if (cartCompany.pickup && !cartCompany.delivery) handleConfirmDeliveryModal({ type: 'takeout' })
		else handleConfirmDeliveryModal({ type: 'delivery', address: selectedAddress })
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
						{cartCoupon?.freeDelivery
							? <Chip style={{ root: { height: 30 } }} color='secondary' label='Cupom: entrega grátis' />
							: !!(cartDelivery && cartDelivery.price)
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
				<DeliveryModal acceptTakeout={cartCompany?.pickup} loading={loadingDelivery} confirmModal={handleConfirmDeliveryModal} closeModal={handleCloseDeliveryModal} />
			</Modal>
		</View>
	);
}
