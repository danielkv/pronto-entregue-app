import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { Alert, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/core';
import _ from 'lodash';
import moment from 'moment';

import CartButton from '../../components/CartButton';
import CartItem from '../../components/CartItem';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import * as CartController from '../../controller/cart';
import CompanyController from '../../controller/company';
import { useKeyboardStatus, useLoggedUserId } from '../../controller/hooks';
import { Button, Paper, Typography, Chip, Divider, TextField, useTheme, Icon, FormHelperText } from '../../react-native-ui';
import { checkCondition } from '../../utils';
import { getErrorMessage } from '../../utils/errors';
import CouponBlock from './Coupon';
import DeliveryBlock from './DeliveryBlock';
import PaymentBlock from './PaymentBlock';
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
	const [scheduled, setScheduled] = useState(null)
	const [availableHours, setAvailableHours] = useState(null)
	const [schedulerStep, setSchedulerStep] = useState('date')
	const [openScheduler, setOpenScheduler] = useState(false)
	const [cartLoading, setCartLoading] = useState(false);
	
	function handleOpenScheduler() {
		setScheduled(moment().add(_.toInteger(schedulableProducts[0].minDeliveryTime), 'minutes').toDate());
		setSchedulerStep('date');
		setOpenScheduler(true);
	}
	function handleCloseScheduler() {
		setOpenScheduler(false);
	}
	function handleSelectDate() {
		const day = moment(scheduled)
		const dayOfWeek = day.format('d');
		const availableDays = company.configs.deliveryHoursEnabled ? company.configs.deliveryHours : company.configs.businessHours;
		const availableHoursTemp = availableDays[dayOfWeek]?.hours

		if (availableHoursTemp.length) {
			setAvailableHours(availableHoursTemp);
			setSchedulerStep('time');
		} else {
			setAvailableHours(null);
			Alert.alert('Selecione outro dia da semana', `${company.displayName} não disponibiliza horários de entrega para esse dia da semana`);
		}
	}
	function handleSelectTime(hour) {
		const day = moment(scheduled);
		const splitedHour = hour.from.split(':');

		day.set({ hour: splitedHour[0], minute: splitedHour[1] })

		setScheduled(day.toDate());
		setSchedulerStep('finish');
	}

	function handleFinishSchedule() {
		handleFinishCart({ force: true });
		handleCloseScheduler();
	}
	
	const keyboardOpen = useKeyboardStatus();
	
	const client = useApolloClient();
	
	const [removeOrderItem] = useMutation(REMOVE_CART_ITEM);
	const [cancelCart] = useMutation(CANCEL_CART);
	
	const { data: { cartScheduled, cartItems, cartDelivery, cartCompany, cartPayment, cartDiscount, cartPrice }, loading: loadingCart, error } = useQuery(GET_CART);
	const { data: { company = null }={}, loading: loadingCompany } = useQuery(GET_COMPANY, { skip: !cartCompany, variables: { id: cartCompany?.id } })

	useEffect(() => {
		if (cartScheduled) client.writeData({ data: { cartScheduled: null } });
	}, [])
	
	useEffect(()=>{
		const paymentPrice = cartPayment?.price || 0;
		const deliveryPrice = cartDelivery?.price || 0;

		const subtotal = CartController.calculateOrderPrice(cartItems, paymentPrice + deliveryPrice )
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

	async function handleFinishCart({ force=false }) {
		try {
			setCartLoading(true);
			if (loggedUserId) {
				await CartController.validateCart();
				if (schedulableProducts.length && !force) {
					handleOpenScheduler();
				} else {
					client.writeData({ data: { cartMessage: message, cartDiscount, cartPrice, cartScheduled: moment(scheduled).valueOf() } });

					navigation.navigate('PaymentScreen');
				}
			} else {
				navigation.navigate('AuthenticationRoutes', { screen: 'LoginScreen', params: {  redirect: 'HomeRoutes', redirectParams: { screen: 'CartScreen' } } });
			}
		} catch (err) {
			if (err.type === 'USER_NO_PHONE_NUMBER')
				Alert.alert(
					'Complete seu cadastro',
					getErrorMessage(err.message),
					[{ text: 'Arrumar isso agora', onPress: ()=>navigation.navigate('ProfileRoutes', { screen: 'SubscriptionScreen', params: { userId: loggedUserId, redirect: { name: 'CartRoutes', params: { screen: 'CartScreen' } } } }) }]
				);
			else
				Alert.alert('Ops, faltou alguma coisa', getErrorMessage(err.message));
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

	const schedulableProducts = CartController.getSchedulableProducts(cartItems);
	
	return (
		<Container>
			{Boolean(schedulableProducts.length) && <Modal
				isVisible={openScheduler}
				onModalHide={handleCloseScheduler}
				onBackButtonPress={handleCloseScheduler}
				onBackdropPress={handleCloseScheduler}
				onSwipeComplete={handleCloseScheduler}
			>
				<Paper>
					{schedulerStep === 'date'
						? 	<>
							<Typography variant='title'>Selecione uma data</Typography>
							<DateTimePicker
								testID='dateTimePicker'
								value={scheduled}
								mode='date'
								is24Hour={true}
								display='calendar'
								minimumDate={moment().add(_.toInteger(schedulableProducts[0].minDeliveryTime), 'minutes').toDate()}
								maximumDate={moment().add(30, 'days').toDate()}
								onChange={(e, date)=>setScheduled(date)}
							/>
							<Button
								variant='filled'
								color='secondary'
								onPress={handleSelectDate}
							>
								Escolher horário
							</Button>
						</>
						: schedulerStep === 'time'
							? <>
								<Typography variant='title'>Selecione um horário</Typography>
								<FormHelperText color='default'>Esse é um horário aproximado</FormHelperText>
								<View style={{ marginVertical: 15 }}>
									{availableHours.map((hour, index) =>
										<TouchableOpacity
											onPress={()=>handleSelectTime(hour)}
											key={index}
											style={{ flexDirection: 'row', justifyContent: 'center', padding: 15, backgroundColor: '#f0f0f0', borderRadius: 6 }}
										>
											<Typography style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>{`${hour.from} - ${hour.to}`}</Typography>
										</TouchableOpacity>
									)}
								</View>
								<Button
									variant='filled'
									onPress={()=>setSchedulerStep('date')}
								>
									Voltar
								</Button>
								<Button
									variant='filled'
									onPress={handleCloseScheduler}
								>
									Cancelar
								</Button>
							</>
							: <>
								<Typography variant='title'>Confira os dados</Typography>
								<Typography variant='text' style={{ marginVertical: 15 }}>
									{`Você reberá seu pedido no dia ${moment(scheduled).format('DD/MM/YY')} a partir das ${moment(scheduled).format('HH:mm')}`}
								</Typography>
								<Button
									variant='filled'
									color='primary'
									onPress={handleFinishSchedule}
								>
									Finaliar agendamento
								</Button>
								<Button
									variant='filled'
									onPress={()=>setSchedulerStep('time')}
								>
									Voltar
								</Button>
								<Button
									variant='filled'
									onPress={handleCloseScheduler}
								>
									Cancelar
								</Button>
							</>
					}
				</Paper>
			</Modal>}
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
