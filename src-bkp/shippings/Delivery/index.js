import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Shipping from '../shipping';
import sharedStyles from '../../sharedStyles';

export default class Delivery extends Shipping {
	constructor (delivery) {
		super();
		this.setTitle(delivery.title);
		this.setType('delivery');
		this.setPrice(delivery.price);
		this.address = delivery.address;		
	}

	renderOption = () => {
		let address = this.address;
		return (
			<View style={styles.itemContainer}>
				<Text style={styles.itemTitle}>{this.title}</Text>
				<Text style={styles.itemStreet}>{`${address.street}, ${address.number}`}</Text>
				<Text style={styles.itemDistrict}>{address.district}</Text>
				<Text style={styles.itemCity}>{`${address.city} - ${address.state}`}</Text>
				<Text style={styles.itemZipcode}>{address.zipcode}</Text>
			</View>
		);
	}

	renderShippingInfo = () => {
		let address = this.address;
		
		return (
			<View style={styles.container}>
				<Text style={styles.message}>Você vai receber seu pedido nesse endereço:</Text>
				<View style={styles.itemContainer}>
					<Text style={styles.itemTitle}>{this.title}</Text>
					<Text style={styles.itemStreet}>{`${address.street}, ${address.number}`}</Text>
					<Text style={styles.itemDistrict}>{address.district}</Text>
					<Text style={styles.itemCity}>{`${address.city} - ${address.state}`}</Text>
					<Text style={styles.itemZipcode}>{address.zipcode}</Text>
				</View>
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
	itemTitle : {
		...sharedStyles.font,
		fontSize:16,
		color:'#336535',
		fontWeight:'100',
	},
	itemTitle : {
		...sharedStyles.font,
		color:'#fff',
		fontWeight:'bold',
		fontSize:16,
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