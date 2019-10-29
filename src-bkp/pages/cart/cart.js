import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Alert, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';

import sharedStyles from '../../sharedStyles';

import NavigationService from '../../NavigationService';
import Panel from '../../components/Panel';
import Header from '../../navigation/header';
import CartButton from '../../components/cartButton';

import Delivery from '../../classes/Delivery';

import DeliveryMethods from './delivery_methods';
import PaymentMethods from './payment_methods';

import Cart from '../../classes/Cart';
import Order from '../../classes/Order';
import User from '../../classes/User';

export default class CartComponent extends Component {
	static navigationOptions = {
		header : null
	}
	constructor (props) {
		super(props);
		this.state = {
			products : null,
			delivery : null,
			payment : null,
			loading : true,

			deliveryOpen : false,
			paymentOpen : false,
		}
	}

	userLogged = () => {
		if (!User.isUserLoggedIn()) {
			NavigationService.navigate('Login', {fromCart:true});
			ToastAndroid.show('Faça o Login para continuar', ToastAndroid.SHORT);
			return false;
		}
		return true;
	}

	openSelectAddress = () => {
		if (this.userLogged()) {
			this.setState({deliveryOpen:true}, ()=>{this.deliveryPanel.open()});
		}
	}
	
	initCart = (cart) => {
		if (!cart.products.length) {
			ToastAndroid.show('Não há nenhum produto no Carrinho', ToastAndroid.SHORT);
			NavigationService.navigate('Menu');
		} else {
			this.setState({
				products:cart.products,
				delivery:cart.delivery || null,
				payment:cart.payment || null,
				observations:cart.observations || '',

				deliveryOpen : false,
				paymentOpen : false,
			});
		}
	}

	setObservations = (observations) => {
		
		Cart.getCart().observations = observations;

		this.initCart(Cart.getCart());
	}

	onRouteFocus = (payload) => {
		try {
			if (payload.state.params && payload.state.params.selectedAddress) {
				
				Cart.setDelivery(Delivery.getAddressMethod(payload.state.params.selectedAddress));
			}

			this.initCart(Cart.getCart());
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			NavigationService.goBack();
		}
	}

	remove = (index) => {
		try {
			let cart = Cart.removeFromCart(index);
			this.initCart(cart);
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	}

	removeFromCart = (product, index) => {
		
		Alert.alert(
			'Remover produto',
			`Tem certeza que deseja remover ${product.title} do carrinho?`,
			[
				{
					text: 'Não',
					style: 'cancel',
				},
				{text: 'Sim', onPress: () => {this.remove(index)}},
			],
			{cancelable: false},
		  );
	}
	
	renderOptinal = (optional) => {
		return (
			<View key={optional.id} style={styles.optinalContainer}>
				<Text style={styles.itemOptions}>
					<Text style={styles.itemOptionalTitle}>{`${optional.title}: `}</Text>
					{optional.getSelectedOptions().map(option=>option.name).join(', ')}
				</Text>
			</View>
		);
	}

	renderProduct = (product, index) => {
		return (
			<View key={index} style={styles.itemContainer}>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={() => {this.removeFromCart(product, index)}} >
						<Icon type='material-community' name='delete' size={20} color='#fff' />
					</TouchableOpacity>
				</View>
				<View>
					<Text style={styles.itemTitle}>{product.title}</Text>
					{product.getOnlyOptionalsSelected().map(this.renderOptinal)}
					{!!product.observations && <Text style={styles.itemObservations}>{`Obs.: ${product.observations}`}</Text>}
				</View>
				<View style={styles.itemFooter}>
					<Text style={styles.itemQuantity}>{`Qtde: ${product.getQuantity()}`}</Text>
					<Text style={styles.itemPrice}>{product.getTotalAmount().toBRL()}</Text>
				</View>
			</View>
		)
	}

  	render() {
		return (
			<View style={styles.container}>

				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					/>
				<Header
					title='Carrinho'
					/>

				{!!this.state.products &&
					<View style={{flex:1}}>
						<ScrollView	style={styles.scrollView}>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>
									{this.state.products.length > 1 ? `${this.state.products.length} itens` : `${this.state.products.length} item`}
								</Text>
								{this.state.products.map(this.renderProduct)}
							</View>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Entrega e pagamento</Text>
								<TouchableOpacity style={styles.boxContainer} onPress={this.openSelectAddress}>
									<View style={styles.boxHeader}>
										<Icon type='material-community' name='truck' color='#336535' size={24} />
										<Text style={styles.boxTitle}>Entrega</Text>
									</View>
									<View style={styles.boxFooter}>
										<Text style={styles.boxInfo}>{this.state.delivery ? this.state.delivery.title : 'Nenhum endereço selecionado'}</Text>
										<Icon type='material-community' name='pencil' color='#336535' size={24} />
										{!!(this.state.delivery && this.state.delivery.price) && <Text style={styles.boxPrice}>{this.state.delivery.price.toBRL()}</Text>}
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.boxContainer} onPress={()=>this.setState({paymentOpen:true}, ()=>{this.paymentPanel.open()})}>
									<View style={styles.boxHeader}>
										<Icon type='material-community' name='credit-card' color='#336535' size={24} />
										<Text style={styles.boxTitle}>Pagamento</Text>
									</View>
									<View style={styles.boxFooter}>
										<Text style={styles.boxInfo}>{this.state.payment ? this.state.payment.title : 'Nenhum pagamento selecionado'}</Text>
										<Icon type='material-community' name='pencil' color='#336535' size={20} />
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Observações</Text>
								<View style={{marginHorizontal:10}}>
									<TextInput value={this.state.observations} style={{...sharedStyles.textArea}} onChangeText={(observations)=>{this.setObservations(observations)}} multiline />
								</View>
							</View>
						</ScrollView>

						<View style={styles.addToCartContainer}>
							<CartButton
								containerStyle={styles.cartButton}
								title='Finalizar pedido'
								forceShowPrice
								price={Cart.getCart().amount.toBRL()}
								onPress={()=>{
									if (this.userLogged()) {
										try {
											Cart.check();
											let order = new Order(Cart.getCart());
											NavigationService.navigate('Payment', {order:order});
										} catch (error) {
											Alert.alert(
												'Ainda falta alguma coisa',
												error.message,
												[{
													text: 'OK',
													style: 'cancel',
												},],
												{cancelable: true},
											);
										}
									}
								}}
								/>
						</View>
					</View>
				}
				{this.state.deliveryOpen && 
					<Panel ref={(panel)=>{this.deliveryPanel = panel;}} title='Endereço de entrega' headerRight={()=>(
						<TouchableOpacity onPress={() => {NavigationService.navigate('Add_Address', {fromCart:true})}}>
							<Icon type='material-community' name='plus' color='#fff' size={24} />
						</TouchableOpacity>
					)}>
						<DeliveryMethods onSelectItem={(method)=>{
							this.deliveryPanel.close(()=>{
								try {
									let delivery = Cart.setDelivery(method);
									this.setState({delivery, deliveryOpen:false});
								} catch (error) {
									ToastAndroid.show(error.message, ToastAndroid.LONG);
								}
							});
						}} />
					</Panel>
				}

				{this.state.paymentOpen && 
					<Panel ref={(panel)=>{this.paymentPanel = panel;}} title='Forma de Pagamento'>
						<PaymentMethods onSelectItem={(method)=>{
							this.paymentPanel.close(()=>{
								try {
									let payment = Cart.setPayment(method);
									this.setState({payment, paymentOpen:false});
								} catch (error) {
									ToastAndroid.show(error.message, ToastAndroid.SHORT);
								}
							});
						}} />
					</Panel>
				}
			</View>
		)
		
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
		backgroundColor: '#336535',
	},
	section : {
		marginBottom:15,
	},

	sectionTitle : {
		...sharedStyles.font,
		fontSize:12,
		textAlign:'left',
		fontWeight:'100',
		color : '#fff',
		marginBottom:10,
		paddingHorizontal:13,
	},
	
	buttonsContainer : {
		flexDirection:'row',
		position:'absolute',
		right:10,
		top: 10
	},
	scrollView : {
		flex: 1,
		width:'100%',
		marginTop:80,
		
		overflow: 'visible',
		paddingHorizontal:20,
		/*alignItems:'stretch'*/
	},
	boxContainer: {
		backgroundColor:'#fff',
		borderRadius:6,
		padding:20,
		marginBottom:15,
		marginHorizontal:10,
	},
	boxHeader : {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-start',
		marginBottom:20,
	},
	boxFooter : {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-start',
	},
	boxTitle : {
		...sharedStyles.font,
		color: '#336535',
		fontSize:16,
		fontWeight:'100',
		marginLeft:10,
	},
	boxInfo : {
		marginRight:10,
	},
	boxPrice : {
		position:'absolute',
		right:0,
		bottom:0,

		...sharedStyles.font,
		color: '#336535',
		fontSize:16,
		fontWeight:'bold',
	},
	itemContainer : {
		backgroundColor:'#5B815C',
		borderRadius:6,
		padding:20,
		marginBottom:15,
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
		color:'#fff',
		fontWeight:'bold',
		fontSize:18,
		marginBottom:8,
	},
	itemObservations : {
		...sharedStyles.font,
		color:'#fff',
		fontWeight:'100',
		fontSize:13,
		marginBottom:8,
	},
	itemOptionalTitle : {
		...sharedStyles.font,
		fontWeight:'bold',
		fontSize:14,
		color:'#fff',
	},
	itemOptions : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:14,
		color:'#fff',
	},
	itemFooter : {
		flexDirection:'row',
		alignItems:'baseline',
		justifyContent:'space-between',
		marginTop:10,
	},
	itemQuantity : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:12,
		color:'#fff',
	},
	itemPrice : {
		...sharedStyles.font,
		fontWeight:'normal',
		fontSize:12,
		color:'#336535',
		backgroundColor:'#fff',
		borderRadius:3,
		paddingHorizontal:5,
		paddingVertical:3,
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
