import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import { Icon } from 'react-native-elements';

import User from '../classes/User';
import Orders from '../classes/Orders';
import Cart from '../classes/Cart';
import NavigationService from '../NavigationService';
import sharedStyles from '../sharedStyles';

const styles = StyleSheet.create({
	itemContainer : {
		backgroundColor:'#649466',
		borderRadius:6,
		padding:20,
		marginBottom:13,
		marginHorizontal:10,

		flexDirection : 'row',
		alignItems:'center',
		
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
		color:'#fff',
		fontWeight:'100',
		fontSize:16,
		flex:1,
		marginLeft:15,
	},
});

export default class Gateway {
	static styles = styles;
	
	setTitle (title) {
		this.title = title;
	}

	setType (type) {
		this.type = type;
	}

	renderOption = () => {
		return (<View style={styles.itemContainer}>
			<Icon  type='material-community' name='cash' size={24} color='#fff' />
			<Text style={styles.itemTitle}>{this.title}</Text>
		</View>);
	}

	async finishPayment(order, component) {
		try {
			component.setState({loading:true});
			let _order = await Orders.add(order, User.getToken());
			Cart.init();
			NavigationService.navigate('Finish', {order:_order});
		} catch (error) {
			Alert.alert('Ocorreu um erro', error.message);
		}
	}
}

