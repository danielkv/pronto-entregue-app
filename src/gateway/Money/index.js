import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

import { Typography, TextField, Paper, Button, useTheme } from '../../react-native-ui';
import {
	GataweyContainer,
	GetawayIconContainer,
} from '../styles'
import {
	FinishContainer,
} from './styles';

export default class Money {
	constructor ({ cart, method }) {
		this.cart = cart;
		this.method = method;
		this.needChange = true;
		this.change = 0;
	}

	Option = ({ onPress }) => {
		return (
			<GataweyContainer onPress={()=>onPress(this.method)}>
				<GetawayIconContainer>
					<Image source={{ uri: this.method.image }} style={{ width: 60, height: 40 }} resizeMode='contain' />
				</GetawayIconContainer>
				<Typography variant='h5' style={{ color: '#666' }}>Dinheiro</Typography>
			</GataweyContainer>
		);
	}

	onSubmit() {
		let message = this.cart.cartMessage;

		if (this.needChange && !this.change) throw new Error ('Insira o valor para que você precisa de troco');
		
		if (this.needChange && this.change) {
			message = `${message}\r\n\r\n----------------\r\nVou precisar de troco para ${this.change}`;
		}
		
		return { ...this.cart, cartMessage: message };
	}

	Page = () => {
		const { palette } = useTheme();
		const { cartPayment, cartPrice } = this.cart;
	
		const [needChange, setNeedChange] = useState(true);
		const [change, setChange] = useState(Math.ceil(cartPrice / 10) * 10);

		useEffect(() => {
			this.needChange = needChange
		}, [needChange])

		useEffect(() => {
			this.change = change
		}, [change])
		
		return (
			<Paper style={{ alignItems: "center" }}>
				<Image source={{ uri: cartPayment.image }} style={{ width: 100, height: 80, resizeMode: 'contain' }} />
				<Typography variant='title'>Pagamento em dinheiro</Typography>
				<View style={{ width: '100%', marginTop: 20 }}>
					<Button
						variant='filled'
						label='Vou precisar de troco'
						icon={needChange ? 'check-square' : 'square'}
						checked={needChange}
						onPress={()=>{ setNeedChange(!needChange) }}
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
			</Paper>
		);
	}
}