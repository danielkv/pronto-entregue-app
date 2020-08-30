import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { Alert, View, Image } from 'react-native';

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';

import CartButton from '../../components/CartButton';
import CartItem from '../../components/CartItem';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import CompanyController from '../../controller/company';
import { useKeyboardStatus, useLoggedUserId, useSelectedAddress } from '../../controller/hooks';
import calculateOrderPrice from '../../helpers/calculateOrderPrice';
import getSchedulableProducts from '../../helpers/getSchedulableProducts';
import { validateCart } from '../../helpers/validateCart';
import { Button, Paper, Typography, Chip, Divider, TextField, useTheme, Icon } from '../../react-native-ui';
import { checkCondition } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import CouponBlock from './Coupon';
import DeliveryBlock from './DeliveryBlock';
import PaymentBlock from './PaymentBlock';
import Scheduler from './Scheduler';
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
import { GET_COMPANY } from '../../graphql/companies';

export default function Cart({ navigation }) {
	const { palette } = useTheme();
	const [message, setMessage] = useState('');
	const loggedUserId = useLoggedUserId();
	const [cartLoading, setCartLoading] = useState(false);
	
	const keyboardOpen = useKeyboardStatus();

	const selectedAddress = useSelectedAddress();
	
	const client = useApolloClient();
	
	const [removeOrderItem] = useMutation(REMOVE_CART_ITEM);
	const [cancelCart] = useMutation(CANCEL_CART);
	
	const { data: { cartScheduled, cartItems, cartDelivery, cartCompany, cartPayment, cartDiscount, cartPrice }, loading: loadingCart, error } = useQuery(GET_CART);
	const { data: { company = null }={}, loading: loadingCompany } = useQuery(GET_COMPANY, { skip: !cartCompany, variables: { id: cartCompany?.id }, fetchPolicy: 'network-only' })

	useEffect(() => {
		if (cartScheduled) client.writeData({ data: { cartScheduled: null } });
	}, [])
	
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
				await validateCart({ schedulableProducts });
				
				client.writeData({ data: { cartMessage: message, cartDiscount, cartPrice } });

				navigation.navigate('PaymentScreen');
			} else {
				navigation.navigate('AuthenticationRoutes', { screen: 'LoginScreen', params: {  redirect: 'HomeRoutes', redirectParams: { screen: 'CartScreen' } } });
			}
		} catch (err) {
			switch (err.type) {
				case 'USER_NO_PHONE_NUMBER':
					Alert.alert(
						'Complete seu cadastro',
						getErrorMessage(err.message),
						[{ text: 'Arrumar isso agora', onPress: ()=>navigation.navigate('ProfileRoutes', { screen: 'SubscriptionScreen', params: { userId: loggedUserId, redirect: { name: 'CartRoutes', params: { screen: 'CartScreen' } } } }) }]
					);
					break;
				case 'ADDRESS_NOT_CREATED':
					Alert.alert(
						'Verificar endereço',
						getErrorMessage(err.message),
						[{ text: 'Verificar', onPress: ()=>navigation.navigate('AddressRoutes', { screen: 'TypeAddressScreen', params: { address: selectedAddress, redirect: { screen: 'CartRoutes', params: { screen: 'PaymentScreen' } } } }) }],
					);
					break;
				default:
					Alert.alert('Ops, faltou alguma coisa', getErrorMessage(err.message));
			}
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

	const schedulableProducts = getSchedulableProducts(cartItems);
	
	return (
		<Container>
			<CartContainerScroll>
				{cartCompany && <Paper>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image source={{ uri: cartCompany.image }} style={{ width: 60, height: 60, borderRadius: 15, marginRight: 15 }} />
						<Typography style={{ flex: 1, fontSize: 18, color: '#333', fontFamily: 'Roboto-Bold', marginRight: 15 }}>{cartCompany.displayName}</Typography>
						<View style={{ marginLeft: 'auto' }}>
							<Chip color='secondary' label={`${cartItems.length} ${cartItems.length > 1 ? 'itens' : 'item'}`} style={{ root: { height: 30 } }} />
						</View>
					</View>
					{Boolean(schedulableProducts.length) && <View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							marginTop: 15,
							backgroundColor: '#f0f0f0',
							borderRadius: 8,
							padding: 13,
						}}>
						<Icon name='info' color='#333' style={{ root: { margin: 0, marginRight: 10 } }}/>
						<Typography style={{ fontSize: 12, color: '#333', flex: 1 }}>Há produtos por encomenda na cesta, você poderá agendar uma data para receber todos esses itens de uma só vez.</Typography>
					</View>}

					{Boolean(company?.allowBuyClosed && !schedulableProducts.length) && <View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							marginTop: 15,
							backgroundColor: '#f0f0f0',
							borderRadius: 8,
							padding: 13,
						}}>
						<Icon name='info' color='#333' style={{ root: { margin: 0, marginRight: 10 } }} />
						<View style={{ flex: 1 }}>
							<Typography style={{ fontSize: 12, color: '#333' }}>
								{`Você está finalizando o pedido com o estabelecimento fechado. Isso quer dizer que  prazo de entrega valerá a partir do horário de abertura.`}
							</Typography>
							<Typography style={{ fontSize: 12, fontFamily: 'Roboto-Bold',color: '#333', marginTop: 5 }}>{`O estabelecimento abre ${moment(company.nextOpen).fromNow()}`}</Typography>
						</View>
					</View>}
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

				<CouponBlock />
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
					<Button variant='outlined' style={{ button: { height: 40 } }} onPress={handleCancelCart}>Limpar Cesta</Button>
					<Typography style={{ color: '#666', textAlign: 'center', fontSize: 12 }}>Isso irá limpar todos os itens da sua cesta.</Typography>
				</Paper>}
			</CartContainerScroll>
			{!keyboardOpen && !loadingCompany &&
				(<CartButtonContainer>
					{Boolean(company?.configs?.deliveryTime && !schedulableProducts.length)
						&& <Typography style={{ marginBottom: 8, marginTop: -8, textAlign: 'center', color: '#fff', fontSize: 12 }}>{`Previsão de entrega: ${CompanyController.renderDeliveryTime(company.configs.deliveryTime)}`}</Typography>}
					
					{Boolean(schedulableProducts.length) && <Scheduler {...{ schedulableProducts, company }} />}

					{cartLoading
						? <LoadingBlock />
						: <CartButton
							title={schedulableProducts.length ? 'Agendar pedido' : 'Confirmar pedido'}
							forceShowPrice
							price={cartPrice}
							onPress={handleFinishCart}
						/>}
					
				</CartButtonContainer>)
			}
		</Container>
	);
}
