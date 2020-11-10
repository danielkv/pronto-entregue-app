import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, View } from 'react-native';

import * as Linking from 'expo-linking'

import { Typography, Paper, Button, Chip } from '../../react-native-ui';
import apolloClient from '../../services/apolloClient';
import { BRL } from '../../utils/currency';
import { getErrorMessage } from '../../utils/errors';
import { GataweyContainer, GetawayIconContainer } from '../styles';

import { REQUES_PIC_PAY_PAYMENT, CHECK_PIC_PAY_PAYMENT } from './graphql/payment';

export default class PicPay {

	constructor({ cart, method, createOrder, afterFinishOrder }) {
		this.payment = null
		this.order = null;

		this.afterFinishOrder = afterFinishOrder;
		this.cart = cart;
		this.method = method;
		this.createOrder = createOrder;
		this.showPaymentButton = false;
	}

	Option = ({ onPress }) => {
		return (
			<GataweyContainer onPress={() => onPress(this.method)}>
				<GetawayIconContainer>
					<Image source={{ uri: this.method.image }} style={{ width: 60, height: 40 }} resizeMode='contain' />
				</GetawayIconContainer>
				<Typography variant='h5' style={{ color: '#666' }}>{this.method.displayName}</Typography>
			</GataweyContainer>
		);
	}

	Page = () => {
		const [loading, setLoading] = useState(false);

		const getOrder = async () => {
			if (this.order) return this.order;

			const { data: { createOrder: order } } = await this.createOrder({ variables: { data: { ...this.cart, status: 'paymentPending' } } })
			this.order = order

			return order;
		}

		const requestPayment = async () => {
			try {
				setLoading(true)

				const order = await getOrder();
				if (!this.payment?.paymentUrl) this.payment = await this.requestPayment(order);

				Linking.openURL(this.payment.paymentUrl);
			} catch (err) {
				Alert.alert('Ops! Algo deu errado', getErrorMessage(err));
			} finally {
				setLoading(false);
			}
		}


		return (
			<Paper style={{ alignItems: "stretch" }}>
				<View style={{ alignItems: 'center' }}>
					<Image source={{ uri: this.method.image }} style={{ width: 100, height: 80, resizeMode: 'contain' }} />
					<Typography style={{ textAlign: "center" }} variant='title'>{this.method.displayName}</Typography>
					<Typography style={{ textAlign: "center" }} variant='subtitle'>Pagamento digital PicPay</Typography>
				</View>
				<View style={{ marginTop: 30 }} >
					<Chip style={{ root: { alignSelf: 'center' } }} label={`Valor Total: ${BRL(this.cart.price).format()}`} />
				</View>
				<View style={{ marginTop: 30, }}>
					{loading
						? <ActivityIndicator />
						: <View>
							<Button onPress={requestPayment} variant='filled' color='primary'>Pagar com PicPay</Button>
							{this.payment && <Button onPress={() => this.checkPayment(this.order.id)}>Verificar pagamento</Button>}
						</View>}
				</View>
			</Paper>
		);
	}

	async requestPayment(order) {
		const companyId = order.company.id;
		const userId = this.cart.userId;
		const payment = {
			orderId: order.id,
			value: order.price,
			returnUrl: Linking.makeUrl()
		}
		const { data, errors } = await apolloClient.mutate({ mutation: REQUES_PIC_PAY_PAYMENT, variables: { companyId, userId, payment } })

		if (errors) throw errors

		return data.requestPicPayPayment;
	}

	// if is paid finishes payment
	async checkPayment(orderId) {
		const { data: { checkPicPayPayment }, errors } = await apolloClient.mutate({ mutation: CHECK_PIC_PAY_PAYMENT, variables: { orderId } })

		if (errors) throw errors;

		// paid statuses
		const completeStatus = ['paid', 'completed', 'chargeback'];
		if (completeStatus.includes(checkPicPayPayment.status)) 
	}
}