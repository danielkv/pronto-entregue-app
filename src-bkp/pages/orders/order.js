import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';

import sharedStyles from '../../sharedStyles';

import NavigationService from '../../NavigationService';

import Order from '../../classes/Order';
import Orders from '../../classes/Orders';
import User from '../../classes/User';

export default class OrderComponent extends Component {
	static navigationOptions = {
		headerLeftAction : 'goBack',
	}
	
	constructor (props) {
		super(props);
		this.state = {
			order : null, 
			loading : true,
		}
	}
	
	loadOrder = (order) => {
		this.setState({order});
	}

	loadOrderId = async (id) => {
		let order;
		try {
			this.setState({loading:true});
			await Orders.load(User.getToken());
			order = Orders.getOrder(id);
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			NavigationService.goBack();
		} finally {
			this.setState({order, loading:false});
		}
	}

	onRouteFocus = (payload) => {
		if (payload.state.params) {
			if (payload.state.params.order) {
				this.loadOrder(payload.state.params.order);
			} else if (payload.state.params.order_id) {
				this.loadOrderId(payload.state.params.order_id);
			}
		}
	}

	cancel = async () => {
		
		this.setState({loading:true});
		let order = this.state.order;
		try {
			order.setStatus(Order.CANCELED);
			await Orders.save(order, User.getToken());
			this.setState({order, loading:false});
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			this.setState({loading:false});
		}
	}

	cancelOrder = () => {
		Alert.alert(
			'Cancelar pedido',
			'Tem certeza que deseja cancelar esse pedido?\n\nPara estornar algum valor pago, entre em contato conosco.',
			[
				{
					text: 'Não',
					style: 'cancel',
				},
				{text: 'Sim', onPress: () => {this.cancel()}},
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

	renderProduct = (product) => {
		return (
			<View key={product.id} style={styles.itemContainer}>
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

	Box = (props) => {
		return (
			<View style={styles.box}>
				<View style={styles.boxHeader}>
					<Icon type='material-community' name={props.icon} size={24} color='#336535' />
					<Text style={styles.boxTitle}>{props.title}</Text>
				</View>
				<View style={styles.boxFooter}>
					{!!props.contentUp && <Text style={styles.boxContentUp}>{props.contentUp}</Text>}
					{!!props.content && <Text style={styles.boxContent}>{props.content}</Text>}
					{!!props.contentDown && <Text style={styles.boxContentDown}>{props.contentDown}</Text>}
				</View>
			</View>
		);
	}

  	render() {
		return (
			<View style={styles.container}>

				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					/>

				{this.state.loading ? <View style={{flex:1, justifyContent:'center'}}><ActivityIndicator color='#fff' size='small' /></View> :
					
					(!!this.state.order &&
					<View style={{flex:1}}>
						<ScrollView	style={styles.scrollView}>
							<View style={styles.boxRow}>
								<this.Box title='Data' icon='calendar' content={this.state.order.date} contentDown={this.state.order.time} />
								<this.Box title='Valor Total' icon='currency-usd' content={this.state.order.amount.toBRL()} />
							</View>
							<View style={styles.boxRow}>
								<this.Box title='Pagamento' icon='credit-card' content={this.state.order.payment.title} />
								<this.Box title='Entrega' icon='truck' content={!!this.state.order.delivery.price && this.state.order.delivery.price.toBRL()} contentUp={this.state.order.delivery.title} />
							</View>
							<View style={styles.section}>
								<View style={styles.sectionHeader}>
									<Text style={styles.sectionTitle}>
										{this.state.order.products.length > 1 ? `${this.state.order.products.length} itens` : `${this.state.order.products.length} item`}
									</Text>
									<Text style={{...styles.itemStatus, ...styles[`${this.state.order.status}Status`]}}>{this.state.order.statusText()}</Text>
								</View>
								{this.state.order.products.map(this.renderProduct)}
							</View>
							{(this.state.order.status == Order.PAYMENT || this.state.order.status == Order.WAITING) &&
							<View style={styles.section}>
								<TouchableOpacity style={styles.cancelButton} onPress={()=>{this.cancelOrder()}}>
									<Text style={styles.cancelButtonText}>Cancelar Pedido</Text>
								</TouchableOpacity>
								<Text style={styles.cancelInfoText}>O pedido pode ser cancelado se estiver 'Aguardando'</Text>
							</View>
							}
						</ScrollView>
					</View>)
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

	sectionHeader : {
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems: 'baseline',
		paddingHorizontal:10,
		marginBottom:15,
	},

	sectionTitle : {
		...sharedStyles.font,
		fontSize:12,
		textAlign:'left',
		fontWeight:'100',
		color : '#fff',
		marginLeft:3,
	},
	
	scrollView : {
		flex: 1,
		width:'100%',
		marginTop:80,
		
		overflow: 'visible',
		paddingHorizontal:15,
		/*alignItems:'stretch'*/
	},
	boxRow : {
		flexDirection:'row',
		justifyContent:'space-between',
		marginBottom:20,
		paddingHorizontal:10,
	},
	box: {
		width:'46%',
		justifyContent:'space-between',
		height:125,
		backgroundColor:'#fff',
		borderRadius:6,
		padding:15,
	},
	boxHeader : {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
	},
	boxTitle : {
		...sharedStyles.font,
		color: '#aaa',
		fontSize:15,
		fontWeight:'100',
	},
	boxFooter : {
		flexDirection:'column',
		alignItems:'flex-end',
		justifyContent:'flex-end',
	},
	
	boxContent : {
		...sharedStyles.font,
		fontSize:18,
		textAlign:'right',
		fontWeight:'bold',
		color : '#336535',
	},
	boxContentUp : {
		...sharedStyles.font,
		fontSize:15,
		textAlign:'right',
		fontWeight:'100',
		color : '#336535',
	},
	boxContentDown : {
		...sharedStyles.font,
		fontSize:15,
		textAlign:'right',
		fontWeight:'100',
		color : '#336535',
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


	itemStatus : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:12,
		paddingHorizontal:6,
		paddingVertical:4,
		borderRadius:3,

		color:'#5B815C',
		backgroundColor:'#fff',
	},
	paymentStatus : {
		color:'#5B815C',
		backgroundColor:'#fff',
	},
	preparingStatus : {
		color:'#fff',
		backgroundColor:'#FF9100',
	},
	deliveryStatus : {
		color:'#fff',
		backgroundColor:'#FF9100',
	},
	deliveredStatus : {
		color:'#fff',
		backgroundColor:'#336535',
	},
	canceledStatus : {
		color:'#fff',
		backgroundColor:'#9B2020',
	},



	cancelButton: {
		padding:10,
		backgroundColor:'#FF4E4E',
		paddingVertical:10,
		borderRadius:4,
		marginHorizontal:10,
		marginBottom:10,
	},

	cancelButtonText : {
		...sharedStyles.font,
		fontWeight:'bold',
		textAlign:'center',
		fontSize:18,
		color:'#fff',
	},
	cancelInfoText : {
		...sharedStyles.font,
		fontWeight:'100',
		textAlign:'center',
		fontSize:12,
		color:'#fff',
	}
});
