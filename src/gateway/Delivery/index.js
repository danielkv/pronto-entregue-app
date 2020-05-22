import React from 'react';
import { Image } from 'react-native';

import { Typography, Paper } from '../../react-native-ui';
import { GataweyContainer, GetawayIconContainer } from '../styles';

export default class Delivery {

	constructor ({ cart, method }) {
		this.cart = cart;
		this.method = method;
	}

	Option = ({ onPress }) => {
		return (
			<GataweyContainer onPress={()=>onPress(this.method)}>
				<GetawayIconContainer>
					<Image source={{ uri: this.method.image }} style={{ width: 60, height: 40 }} resizeMode='contain' />
				</GetawayIconContainer>
				<Typography variant='h5' style={{ color: '#666' }}>{this.method.displayName}</Typography>
			</GataweyContainer>
		);
	}

	Page = () => {
		
		return (
			<Paper style={{ alignItems: "center" }}>
				<Image source={{ uri: this.cart.cartPayment.image }} style={{ width: 100, height: 80, resizeMode: 'contain' }} />
				<Typography style={{ textAlign: "center" }} variant='title'>{this.cart.cartPayment.displayName}</Typography>
				<Typography style={{ textAlign: "center" }} variant='subtitle'>Cartão de Crédito/Débito na entrega</Typography>
			</Paper>
		);
	}
}