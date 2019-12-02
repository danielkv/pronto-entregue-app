import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon, CheckBox, Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'

import {
	GataweyContainer,
	GetawayTitle,
	GetawayIconContainer,
	LabelText,
} from '../styles'

import {
	FinishContainer,
	ErrorMessage,
	CartButtonContainer,
	FormContainer,
	Title,
} from './styles';

import CartButton from '../../components/CartButton';

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
	const { cartItems, cartDelivery, cartPayment, cartDiscount, cartPrice } = cart;

	const [needChange, setNeedChange] = useState(false);
	const [change, setChange] = useState(Math.ceil(cartPrice / 10) * 10);
	const [error, setError] = useState('');
	
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
						<>
							<LabelText h3>Troco para quanto?</LabelText>
							<TextInputMask
								type='money'
								value={change}
								onChangeText={(value)=>setChange(value)}
								options={{
									unit: 'R$ ',
								}}
								customTextInput={Input}
								customTextInputProps={{
									placeholder: 'Troco para quanto?',
									// type: 'number',
									
									keyboardType: 'numeric'
								}}
							/>
						</>
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