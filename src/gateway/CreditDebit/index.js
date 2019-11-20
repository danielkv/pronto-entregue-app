import React from 'react';
import { Icon } from 'react-native-elements';

import {
	GataweyContainer,
	GetawayTitle,
	GetawayIconContainer,
} from '../styles';

import {
	FinishContainer,
	CartButtonContainer,
	FormContainer,
	Title,
} from './styles';

import CartButton from '../../components/CartButton';

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