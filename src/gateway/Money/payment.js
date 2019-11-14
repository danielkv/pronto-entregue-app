import React, {useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';

import sharedStyles from '../../sharedStyles';
import TextInput from '../../components/textInput';
import CartButton from '../../components/cartButton';
import Cart from '../../classes/Cart';
import { Icon } from 'react-native-elements';
import CheckBox from '../../components/checkBox';
import Validation from '../../validation';

export default function renderPayment (props) {

	const validation = new Validation({
		fields : {
			cash : {required:true},
		}
	});

	const checkBoxArray = [
		{
			key : 'needChange',
			title : 'Vou precisar de troco',
			selected : true,
		},
		{
			key : 'dontNeedChange',
			title : 'Não preciso',
			selected : false,
		}
	]

	const [needChange, setNeedChange] = useState(true);
	const [cash, setCash] = useState('');
	const [cashErrors, setCashErrors] = useState('');
	const [checkBoxItems, setCheckBoxItems] = useState(checkBoxArray);

	const {order, gateway, component} = props;
	
	finishPayment = async () => {
		let {error, errors} = validation.validate({cash:cash}, {cash:{required:needChange}});
		let {cash:newCashErrors} = errors;
	
		setCashErrors(newCashErrors);
		if (!error) {
			if (needChange) order.observations += `\n\r-----\n\rVou precisar de troco para ${parseInt(cash).toBRL()}`;
			order.setStatus('waiting');
			await gateway.finishPayment(order, component);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.paymentContainer}>
				<Icon type='material-community' name='cash' size={75} color='#fff' />
				<Text style={styles.gatewayTitle}>{gateway.title}</Text>
				<View style={styles.checkBoxContainer}>
					<CheckBox
						data={checkBoxItems}
						onSelectOption={(selectedOption)=>{
							checkBoxItems.forEach(item => {item.selected = false});
							selectedOption.selected = true;
							setNeedChange(checkBoxItems[0].selected);
						}}
						/>
				</View>
				{needChange &&
				<TextInput 
					placeholder='Troco para quanto?'
					value={cash.toString()}
					onChangeText={(value)=>setCash(value)}
					keyboardType='numeric'
					errors = {cashErrors.errors}
					/>}
			</View>
			<View style={styles.addToCartContainer}>
				<CartButton
					containerStyle={styles.cartButton}
					title='Finalizar'
					icon='check'
					forceShowPrice
					price={order.amount.toBRL()}
					onPress={()=>{
						finishPayment();
					}}
					/>
			</View>
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	paymentContainer: {
		flex: 1,
		flexDirection:'column',

		paddingHorizontal:40,
	},
	gatewayTitle : {
		...sharedStyles.font,
		textAlign:'center',
		fontSize:18,
		fontWeight:'bold',
		marginVertical:20,
		color:'#fff',
	},
	checkBoxContainer : {
		marginBottom:20,
	},	

	addToCartContainer: {
		padding:10,
		backgroundColor:'#fff',
		borderTopColor:'#365737',
		borderTopWidth:5,
		zIndex:500,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 4,
	},
	cartButton: {
		height:50,
	},
});