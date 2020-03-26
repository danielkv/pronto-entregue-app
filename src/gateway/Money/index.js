import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

import CartButton from '../../components/CartButton';

import { Typography, TextField, Paper, Button, useTheme } from '../../react-native-ui';
import {
	GataweyContainer,
	GetawayIconContainer,
} from '../styles'
import {
	FinishContainer,
	ErrorMessage,
	CartButtonContainer,
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
	const { palette } = useTheme();
	const { cartItems, cartDelivery, cartPayment, cartDiscount, cartPrice, cartCompany } = cart;

	const [needChange, setNeedChange] = useState(false);
	const [change, setChange] = useState(Math.ceil(cartPrice / 10) * 10);
	const [error, setError] = useState('');
	
	let { cartMessage } = cart;
	
	const onSubmit = () => {
		if (needChange && !change) return setError('Insira o valor para que você precisa de troco');
		
		if (change) {
			cartMessage = `${cartMessage}\r\n\r\n----------------\r\nVou precisar de troco para ${change}`;
		}
		
		return onFinish({ cartItems, cartDelivery, cartPayment, cartDiscount, cartMessage, cartPrice, cartCompany });
	}
	
	return (
		<FinishContainer>
			<ScrollView style={{ flex: 1 }}>
				<Paper style={{ alignItems: "center" }}>
					<Image source={{ uri: cartPayment.image }} style={{ width: 100, height: 80, resizeMode: 'contain' }} />
					<Typography variant='title'>Pagamento em dinheiro</Typography>
					<View style={{ width: '100%', marginTop: 20 }}>
						<Button
							variant='filled'
							label='Vou precisar de troco'
							icon={needChange ? 'check-square' : 'square'}
							checked={needChange}
							onPress={()=>{ setError(''); setNeedChange(!needChange) }}
						/>
						{needChange && (
							<View style={{ marginTop: 20 }}>
								<Typography variant='subtitle'>Troco para quanto?</Typography>
								<TextInputMask
									type='money'
									value={change}
									onChangeText={(value)=>setChange(value)}
									options={{
										unit: 'R$ ',
									}}
									customTextInput={TextField}
									customTextInputProps={{
										placeholder: 'Troco para quanto?',
										// type: 'number',
										style: { inputContainer: { backgroundColor: palette.background.main } },
									
										keyboardType: 'numeric'
									}}
								/>
							</View>
						)}
					</View>
					{!!error && <ErrorMessage>{error}</ErrorMessage>}
				</Paper>
			</ScrollView>
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