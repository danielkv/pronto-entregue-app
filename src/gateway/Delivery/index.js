import React from 'react';
import { Image, View } from 'react-native';

import CartButton from '../../components/CartButton';

import { Typography, Paper } from '../../react-native-ui';
import {
	GataweyContainer,
	GetawayIconContainer,
} from '../styles';
import {
	FinishContainer,
	CartButtonContainer,
} from './styles';


export const Option = ({ method, onPress }) => {
	return (
		<GataweyContainer onPress={onPress}>
			<GetawayIconContainer>
				<Image source={{ uri: method.image }} style={{ width: 60, height: 40 }} resizeMode='contain' />
			</GetawayIconContainer>
			<Typography variant='h5' style={{ color: '#666' }}>{method.displayName}</Typography>
		</GataweyContainer>
	);
}

export const Finish = ({ cart, onFinish }) => {
	const { cartPrice } = cart;
	
	const onSubmit = () => {
		return onFinish(cart);
	}
	
	return (
		<FinishContainer>
			<View style={{ flex: 1 }}>
				<Paper style={{ alignItems: "center" }}>
					<Image source={{ uri: cart.cartPayment.image }} style={{ width: 100, height: 80, resizeMode: 'contain' }} />
					<Typography style={{ textAlign: "center" }} variant='title'>{cart.cartPayment.displayName}</Typography>
					<Typography style={{ textAlign: "center" }} variant='subtitle'>Cartão de Crédito/Débito na entrega</Typography>
				</Paper>
			</View>
			<CartButtonContainer>
				<CartButton
					title='Finalizar pedido'
					icon='check'
					forceShowPrice
					price={cartPrice}
					onPress={onSubmit}
				/>
			</CartButtonContainer>
		</FinishContainer>
	);
}