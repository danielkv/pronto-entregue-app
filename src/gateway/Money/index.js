import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Icon, CheckBox, Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'

import CartButton from '../../components/CartButton';

import { Typography } from '../../react-native-ui';
import {
	GataweyContainer,
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


export const Option = ({ method, onPress }) => {
	return (
		<GataweyContainer onPress={onPress}>
			<GetawayIconContainer>
				<Image source={{ uri: method.image }} style={{ width: 60, height: 40 }} resizeMode='contain' />
			</GetawayIconContainer>
			<Typography variant='h5' style={{ color: '#666' }}>Dinheiro</Typography>
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