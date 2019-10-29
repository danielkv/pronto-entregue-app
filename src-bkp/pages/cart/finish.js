import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, BackHandler } from 'react-native';
import { NavigationEvents} from 'react-navigation';
import { Icon } from 'react-native-elements';

import NavigationService from '../../NavigationService';
import Header from '../../navigation/header';
import CartButton from '../../components/cartButton';
import sharedStyles from '../../sharedStyles';

import Order from '../../classes/Order';

export default class FinishPage extends Component {
	static navigationOptions = {
		header : null,
	}
	constructor (props) {
		super(props);
		this.backHandler = null;
		this.state = {
			order: null
		}
	}
	
	initFinish = (order) => {
		if (!(order instanceof Order)) throw {code:'is_not_payment', message:'Não é uma forma de pagamento'};

		this.setState({order : order});
	}

	

	onRouteFocus = (payload) => {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
			NavigationService.navigate('Menu');
			return true;
		});

		try {
			
			if (payload.state.params && payload.state.params.order) {
				this.initFinish(payload.state.params.order);
			} else
				throw {code:'no_order_set', message:'Nenhum pedido definido'}
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			NavigationService.goBack();
		}
	}

	onRouteBlur = () => {
		//
	
		if (this.backHandler) this.backHandler.remove();
	}
	
  	render() {
		return (
			<View style={styles.container}>

				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					onWillBlur={() => this.onRouteBlur()}
					/>
				

				{!!this.state.order && 
					<View style={styles.finishInfoContainer}>
						<Icon type='material-community' name='thumb-up' size={65} color='#fff' />
						<Text style={styles.title}>Pedido encaminhado para o preparo!</Text>
						<this.state.order.delivery.renderShippingInfo order={this.state.order} />
						<CartButton
							title='Acompanhar pedido'
							containerStyle={styles.cartButton}
							icon='transfer-right'
							onPress={()=>{
								NavigationService.navigate('Order', {order_id:this.state.order.id});
							}}
							/>
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
	title : {
		...sharedStyles.font,
		textAlign:'center',
		fontSize:18,
		color:'#fff',
		fontWeight:'bold',
		marginTop:10,
	},
	finishInfoContainer:{
		flex:1,
		marginTop:80,
		
	},
	cartButton: {
		height:50,
		marginHorizontal:30
	},
});
