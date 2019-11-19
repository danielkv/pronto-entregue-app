import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { Icon, CheckBox, Input } from 'react-native-elements';

import {
	GataweyContainer,
	GetawayTitle,
	GetawayIconContainer,
} from '../styles'

import {
	FinishContainer,
	ErrorMessage,
	CartButtonContainer,
	FormContainer,
	Title,
} from './styles';

import CartButton from '../../components/cartButton';

export const Option = ({ onPress }) => {
	return (
		<GataweyContainer onPress={onPress}>
			<GetawayIconContainer>
				<Icon type='material-community' name='cash' size={24} color='#fff' />
			</GetawayIconContainer>
			<GetawayTitle>Dinheiro</GetawayTitle>
		</GataweyContainer>
	);
}

export const Finish = ({ onFinish, cart }) => {
	const [needChange, setNeedChange] = useState(false);
	const [change, setChange] = useState('');
	const [error, setError] = useState('');

	
	const { cartItems, cartDelivery, cartPayment, cartDiscount, cartPrice } = cart;
	let { cartMessage } = cart;
	
	const onSubmit = () => {
		if (needChange && !change) return setError('Insira o valor para que você precisa de troco');
		
		if (change) {
			cartMessage = `${cartMessage}\r\n\r\n----------------\r\nVou precisar de troco para ${change}`;
		}
		
		return onFinish({ cartItems, cartDelivery, cartPayment, cartDiscount, cartMessage, cartPrice });
	}
	
	return (
		<FinishContainer>
			<FormContainer>
				<Icon type='material-community' name='cash' size={75} color='#fff' />
				<Title>Pagamento em dinheiro</Title>
				<View>
					<CheckBox
						title='Vou precisar de troco'
						checked={needChange}
						onPress={()=>{ setError(''); setNeedChange(!needChange) }}
					/>
					{needChange && (
						<Input
							placeholder='Troco para quanto?'
							type='number'
							value={change.toString()}
							onChangeText={(value)=>setChange(value)}
							keyboardType='numeric'
						/>
					)}
				</View>
				{!!error && <ErrorMessage>{error}</ErrorMessage>}
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