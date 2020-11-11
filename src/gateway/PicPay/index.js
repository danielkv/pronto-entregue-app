import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import * as Linking from 'expo-linking'

import { Typography, Paper, Button, Chip } from '../../react-native-ui';
import apolloClient from '../../services/apolloClient';
import { BRL } from '../../utils/currency';
import { getErrorMessage } from '../../utils/errors';
import { GataweyContainer, GetawayIconContainer } from '../styles';

import { REQUES_PIC_PAY_PAYMENT, CHECK_PIC_PAY_PAYMENT } from './graphql/payment';

export default class PicPay {

	constructor({ cart: order, method }) {
		this.payment = null
		this.order = order;

		this.method = method;
	}

	onSubmit(cart) {
		return { ...cart, status: 'paymentPending' }
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

	afterFinishOrder(navigation, order) {
		navigation.reset({
			index: 1,
			routes: [
				{ name: 'FeedScreen' },
				{ name: 'OrderScreen', params: { orderId: order.id } },
				{ name: 'MakePaymentScreen', params: { order } }
			]
		})
	}

	Page = () => {
		return (
			<Paper style={{ alignItems: "center" }}>
				<Image source={{ uri: this.method.image }} style={{ width: 100, height: 80, resizeMode: 'contain' }} />
				<Typography style={{ textAlign: "center" }} variant='title'>{this.method.displayName}</Typography>
				<Typography style={{ textAlign: "center" }} variant='subtitle'>PicPay</Typography>
			</Paper>
		);
	}

	PageMakePayment = () => {
		const [loading, setLoading] = useState(false);
		const navigation = useNavigation();

		const requestPayment = async () => {
			try {
				setLoading(true)

				if (!this.payment?.paymentUrl) this.payment = await this.requestPayment(this.order);

				Linking.openURL(this.payment.paymentUrl);

				navigation.replace('OrderScreen', { orderId: this.order.id })
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
					<Chip style={{ root: { alignSelf: 'center' } }} label={`Valor Total: ${BRL(this.order.price).format()}`} />
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
		const userId = this.order.userId;
		const payment = {
			orderId: order.id,
			value: order.price,
			returnUrl: Linking.makeUrl()
		}
		const { data, errors } = await apolloClient.mutate({ mutation: REQUES_PIC_PAY_PAYMENT, variables: { companyId, userId, payment } })

		if (errors) throw errors

		return data.requestPicPayPayment;
	}

	/* // if is paid finishes payment
	async checkPayment(orderId) {
		const { data: { checkPicPayPayment }, errors } = await apolloClient.mutate({ mutation: CHECK_PIC_PAY_PAYMENT, variables: { orderId } })

		if (errors) throw errors;

		// paid statuses
		const completeStatus = ['paid', 'completed', 'chargeback'];
		if (completeStatus.includes(checkPicPayPayment.status)) 
	} */
}