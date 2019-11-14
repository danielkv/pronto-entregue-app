import React from 'react';
import { Icon } from 'react-native-elements';

import {
	GataweyContainer,
	GetawayTitle,
	GetawayIconContainer,
} from '../styles'

export const Option = ({ onPress }) => {
	return (
		<GataweyContainer onPress={onPress}>
			<GetawayIconContainer>
				<Icon type='material-community' name='credit-card' size={24} color='#fff' />
			</GetawayIconContainer>
			<GetawayTitle>Cartão de Crédito/Débito</GetawayTitle>
		</GataweyContainer>
	);
}

export const Finish = () => {
	return (
		<GataweyContainer>
			<GetawayIconContainer>
				<Icon type='material-community' name='credit-card' size={24} color='#fff' />
			</GetawayIconContainer>
			<GetawayTitle>Cartão de Crédito/Débito</GetawayTitle>
		</GataweyContainer>
	);
}

/* renderPayment = ({order, component}) => {
	return (
		<View style={styles.container}>
			<View style={styles.paymentContainer}>
				<Icon type='material-community' name='credit-card' size={75} color='#fff' />
				<Text style={styles.gatewayTitle}>{this.title}</Text>
				<Text style={styles.textInfo}>
					Você pagará com cartão de débito quando for retirar seu pedido.
				</Text>
				<Text style={styles.textInfo}>
					Clique em Finalizar para enviar seu pedido.
				</Text>
				<Icon type='material-community' name='chevron-down' size={24} color='#fff' />
			</View>
			<View style={styles.addToCartContainer}>
				<CartButton
					containerStyle={styles.cartButton}
					title='Finalizar'
					icon='check'
					forceShowPrice
					price={order.amount.toBRL()}
					onPress={()=>{
						this.finishPayment(order, component);
					}}
					/>
			</View>
		</View>
	); */