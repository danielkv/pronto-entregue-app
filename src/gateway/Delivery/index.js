import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';

import CartButton from '../../components/CartButton';

import { Typography } from '../../react-native-ui';
import {
	GataweyContainer,
	GetawayIconContainer,
} from '../styles';
import {
	FinishContainer,
	CartButtonContainer,
	FormContainer,
	Title,
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
			<FormContainer>
				<Icon type='material-community' name='credit-card' size={75} color='#fff' />
				<Title>Pagamento com Cartão de Crédito/Débito</Title>
			</FormContainer>
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