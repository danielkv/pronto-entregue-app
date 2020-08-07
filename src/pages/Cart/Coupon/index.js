import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal'

import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import LoadingBlock from '../../../components/LoadingBlock';

import { useLoggedUserId, useSelectedAddress } from '../../../controller/hooks';
import sanitizeOrderData from '../../../helpers/sanitizeOrderData';
import { Paper, Icon, Typography, Chip, TextField, useTheme, Button, IconButton } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';
import { getErrorMessage } from '../../../utils/errors';
import { CardHeader, CardContent, CardInfo } from '../styles';
import BarCodeButton from './scanButton';

import { GET_CART, SET_CART_COUPON } from '../../../graphql/cart';
import { CHECK_COUPON } from '../../../graphql/coupons';

// import { Container } from './styles';

export default function CouponBlock() {
	const navigation = useNavigation();
	const { palette } = useTheme();
	const [modalOpen, setModalOpen] = useState(false);
	const { data: cart } = useQuery(GET_CART);
	const client = useApolloClient();
	const loggedUserId = useLoggedUserId();
	const selectedAddress = useSelectedAddress();
	const [couponName, setCouponName] = useState('');
	const [loadingCoupon, setLoadingCoupon] = useState(false);
	const [scanningCode, setScanningCode] = useState(false);

	const [checkCoupon] = useMutation(CHECK_COUPON);
	const [setCartCoupon] = useMutation(SET_CART_COUPON);

	useEffect(()=>{
		if (cart.cartCoupon) client.writeData({ data: { cartUseCredits: false } })
	}, [cart.cartCoupon])

	function handleCloseModal () {
		setModalOpen(false);
		setCouponName('');
	}
	
	function handleOpenModal () {
		if (loggedUserId)
			setModalOpen(true);
		else
			navigation.navigate('AuthenticationRoutes', { screen: 'LoginScreen', params: {  redirect: 'HomeRoutes', redirectParams: { screen: 'CartScreen' } } });
	}

	function handleCheckCoupon(name, order) {
		return checkCoupon({ variables: { couponName: name, order } })
			.then(({ data: { checkCoupon } })=>checkCoupon)
			.catch(err => {
				Alert.alert('Ups! Algo não deu certo', getErrorMessage(err));
			})
	}

	async function handlePressApplyCoupon(name) {
		try {
			if (!name) return;
			setLoadingCoupon(true)
			const sanitizedOrder = sanitizeOrderData({ ...cart, userId: loggedUserId, address: selectedAddress });
			const coupon = await handleCheckCoupon(name, sanitizedOrder);
			if (!coupon) return client.writeData({ data: { cartCoupon: null } });

			await setCartCoupon({ variables: { data: coupon } });
			handleCloseModal();
		} catch (err) {
			Alert.alert('Ups! Ocorreu um erro', getErrorMessage(err));
		} finally {
			setLoadingCoupon(false);
		}
	}

	return (
		<>
			<TouchableOpacity onPress={handleOpenModal}>
				<Paper style={{ paddingVertical: 25 }}>
					<CardHeader>
						<Icon name='percent' size={20} color='#333' />
						<Typography variant='title' style={{ marginLeft: 10, fontSize: 20 }}>Cupom</Typography>
						
						{Boolean(cart.cartCoupon) && <IconButton icon='trash' onPress={()=>client.writeData({ data: { cartCoupon: null } })} />}
					</CardHeader>
					<CardContent>
						<CardInfo>
							{cart.cartCoupon
								? <Chip color='secondary' style={{ text: { textTransform: 'uppercase' } }} label={cart.cartCoupon.name} />
								: <Typography>Sem cupom</Typography>}
						</CardInfo>
						<Icon name='edit' size={24} color='#333' />
						{cart.cartCoupon && cart.cartCoupon.value > 0 &&
							(cart.cartCoupon.valueType == 'percentage'
								? <Typography>{`${BRL(cart.cartCoupon.value/100*cart.cartSubtotal).format()}`}</Typography>
								: <Typography>{`${BRL(cart.cartCoupon.value).format()}`}</Typography>)}
						{cart?.cartCoupon?.freeDelivery && <Typography>{` + entrega grátis`}</Typography>}
					</CardContent>
				</Paper>
			</TouchableOpacity>
			<Modal
				isVisible={modalOpen}
				onModalHide={handleCloseModal}
				onSwipeComplete={handleCloseModal}
				onBackButtonPress={handleCloseModal}
				onBackdropPress={handleCloseModal}
				animationIn='slideInDown'
				animationOut='slideOutUp'
				swipeDirection='up'
			>
				<Paper>
					<Typography variant='title'style={{ marginBottom: 20 }}>Cupom</Typography>
					{!scanningCode &&
					(
						<>
							<TextField
								label='Digite o cupom'
								value={couponName}
								onChangeText={(text)=>setCouponName(text)}
								autoCorrect={false}
								autoCompleteType='off'
								autoCapitalize='none'
								style={{ inputContainer: { backgroundColor: palette.background.main } }}
							/>
							<Button
								variant='filled'
								color='secondary'
								onPress={()=>handlePressApplyCoupon(couponName)}
							>
								{loadingCoupon
									? <LoadingBlock />
									: 'Aplicar'}
							</Button>
							<Button
								variant='outlined'
								onPress={handleCloseModal}
							>
								Fechar
							</Button>
						</>
					)}
					<BarCodeButton setScanningCode={setScanningCode} scanningCode={scanningCode} handlePressApplyCoupon={handlePressApplyCoupon} />
				</Paper>
			</Modal>
		</>
	);
}