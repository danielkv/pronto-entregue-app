import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import NavigationService from '../../NavigationService';
import Header from '../../navigation/header';

import Order from '../../classes/Order';

export default class PaymentPage extends Component {
	static navigationOptions = {
		header : null
	}
	constructor (props) {
		super(props);
		this.state = {
			order: null,
			loading:true,
		}
	}
	
	initPayment = (order) => {
		if (!(order instanceof Order)) throw {code:'is_not_payment', message:'Não é uma forma de pagamento'};

		this.setState({order : order, loading:false});
	}

	onRouteFocus = (payload) => {
		try {
			if (payload.state.params && payload.state.params.order)
				this.initPayment(payload.state.params.order);
			else
				throw {code:'no_payment_set', message:'Nenhuma forma de pagamento definida'}
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			NavigationService.goBack();
		}
	}
	
  	render() {
		return (
			<View style={styles.container}>

				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					/>
				<Header
					title='Pagamento'
					headerLeftAction='goBack'
					/>
					
				{!!this.state.loading && <View style={{flex:1, justifyContent:'center'}}><ActivityIndicator color='#fff' size='small' /></View>}
				{(this.state.order && !this.state.loading) && 
					<View style={styles.paymentInfoContainer}>
						<this.state.order.payment.renderPayment component={this} order={this.state.order} />
					</View>
				}

			</View>
		)
		
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#336535',
	},
	paymentInfoContainer:{
		flex:1,
		marginTop:80,
		
	},
});
