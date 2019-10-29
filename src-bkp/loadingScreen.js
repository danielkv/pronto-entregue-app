import React, { Component } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, ToastAndroid } from 'react-native';

import User from './classes/User';
import Delivery from './classes/Delivery';
import Payments from './classes/Payments';
import Business from './classes/Business';
import Cart from './classes/Cart';
import NavigationService from './NavigationService';

//test

export default class LoadingScreen extends Component {

	componentDidMount () {
		this.loadData();
	}

	loadData = async () => {
		try {
			await User.load();
			await Delivery.load();
			await Business.load();
			await Payments.load();
			
			//test
			/*let str = '{"amount":70,"discount":0,"status":"","products":[{"id":14,"title":"Pizza","image":"https://iocus.com.br/delivery/wp-content/uploads/2019/04/pizza.jpg","desc":"","price":0,"product_type":"variable","optionals":[{"id":98,"title":"Tamanho","selection_type":"single","min_select":1,"max_select":1,"restrict_optional":0,"order":1,"options":[{"id":101,"name":"Broto","desc":"","price":20,"restrict_optional":1,"selected":false},{"id":102,"name":"Pequena","desc":"","price":25,"restrict_optional":2,"selected":false},{"id":103,"name":"Média","desc":"","price":35,"restrict_optional":3,"selected":false},{"id":100,"name":"Grande","desc":"","price":45,"restrict_optional":4,"selected":false},{"id":104,"name":"Gigante","desc":"","price":55,"restrict_optional":4,"selected":true}]},{"id":115,"title":"Sabores","selection_type":"multi","min_select":1,"max_select":0,"restrict_optional":98,"order":2,"options":[{"id":116,"name":"Queijo","desc":"","price":0,"restrict_optional":0,"selected":false},{"id":122,"name":"4 queijos","desc":"","price":0,"restrict_optional":0,"selected":true},{"id":117,"name":"Calabresa","desc":"","price":0,"restrict_optional":0,"selected":false},{"id":118,"name":"Portuguesa","desc":"","price":0,"restrict_optional":0,"selected":true},{"id":119,"name":"Camarão","desc":"","price":10,"restrict_optional":0,"selected":true}]}],"quantity":1,"observations":""},{"id":127,"title":"Coca-cola","image":"https://iocus.com.br/delivery/wp-content/uploads/2019/04/coca-cola-1.jpg","desc":"Garrafa 600 ml","price":5,"product_type":"simple","optionals":[],"quantity":1,"observations":""}],"payment":null,"delivery":null}';
			let _cart = JSON.parse(str);*/
			Cart.init();

			NavigationService.replace('DrawerNavigator');
			//test
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
					source={require('./images/logo-pizzaria-colorido-v2.png')}
					style={styles.image}
					/>
				<ActivityIndicator color='#fff' size='small' />
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container : {
		justifyContent : 'center',
		alignItems:'center',
		flex:1,
		backgroundColor:'#336535'
	},
	image : {
		maxWidth:'60%',
		width : 156,
		marginBottom : 40,
		resizeMode:'contain'
	}
});