import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import sharedStyles from '../../sharedStyles';
import Business from '../../classes/Business';
import Shipping from '../shipping';

export default class Pickup extends Shipping {
	constructor () {
		super();
		this.setTitle('Retirar no local');
		this.setType('pickup');
		this.setPrice(0);
	}

	renderShippingInfo () {
		let info = Business.getInfo();
		let {address} = info;
		return (
			<View style={styles.container}>
				<Text style={styles.message}>Você deve retirar seu pedido no endereço abaixo:</Text>
				<View style={styles.itemContainer}>
					<Text style={styles.itemStreet}>{`${address.street}, ${address.number}`}</Text>
					<Text style={styles.itemDistrict}>{address.district}</Text>
					<Text style={styles.itemCity}>{`${address.city} - ${address.state}`}</Text>
					<Text style={styles.itemZipcode}>{address.zipcode}</Text>
				</View>
				<Text style={{...styles.message, textAlign:'center'}}>Qualquer dúvida entre em contato</Text>
				<Text style={styles.phone}>{info.phone}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		margin : 20,
	},
	message: {
		...sharedStyles.font,
		fontSize:12,
		color:'#fff',
		fontWeight:'100',
		marginBottom:10,
		marginLeft:12,
	},
	phone: {
		...sharedStyles.font,
		fontSize:14,
		color:'#fff',
		fontWeight:'100',
		marginBottom:10,
		textAlign:'center',
	},
	itemContainer : {
		backgroundColor:'#649466',
		borderRadius:6,
		padding:20,
		marginBottom:13,
		marginHorizontal:10,
		
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
	},
	itemStreet : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:14,
		color:'#fff',
	},
	itemDistrict : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:14,
		color:'#fff',
	},
	itemCity : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:14,
		color:'#fff',
	},
	itemZipcode : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:14,
		color:'#fff',
	},
});