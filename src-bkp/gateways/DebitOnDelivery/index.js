import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

import Gateway from '../gateway';
import sharedStyles from '../../sharedStyles';
import CartButton from '../../components/cartButton';


export default class DebitOnDelivery extends Gateway {
	constructor () {
		super();
		this.setTitle('Débito na entrega');
		this.setType('DebitOnDelivery');
	}

	renderOption = () => {
		return (<View style={Gateway.styles.itemContainer}>
			<Icon  type='material-community' name='credit-card' size={24} color='#fff' />
			<Text style={Gateway.styles.itemTitle}>{this.title}</Text>
		</View>);
	}

	renderPayment = ({order, component}) => {
		return (
			<View style={styles.container}>
				<View style={styles.paymentContainer}>
					<Icon type='material-community' name='credit-card' size={75} color='#fff' />
					<Text style={styles.gatewayTitle}>{this.title}</Text>
					<Text style={styles.textInfo}>
						Você pagará com cartão de débito quando for retirar seu pedido.
					</Text>
					<Text style={styles.textInfo}>
						Clique em Finalizar para enviar seu pedido.
					</Text>
					<Icon type='material-community' name='chevron-down' size={24} color='#fff' />
				</View>
				<View style={styles.addToCartContainer}>
					<CartButton
						containerStyle={styles.cartButton}
						title='Finalizar'
						icon='check'
						forceShowPrice
						price={order.amount.toBRL()}
						onPress={()=>{
							this.finishPayment(order, component);
						}}
						/>
				</View>
			</View>
		);
	}
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
	textInfo : {
		...sharedStyles.font,
		textAlign:'center',
		fontSize:14,
		fontWeight:'100',
		color:'#fff',
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