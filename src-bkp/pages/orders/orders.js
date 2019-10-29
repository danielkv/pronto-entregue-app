import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation';

//import Header from '../../navigation/header';
import sharedStyles from '../../sharedStyles';
import NavigationService from '../../NavigationService';
import User from '../../classes/User';
import Orders from '../../classes/Orders';
import Cart from '../../classes/Cart';

export default class AddressesComp extends Component {
	/*static navigationOptions = {
		header : null
	}*/

	constructor (props) {
		super(props);
		this.state = {
			orders : null,
			loading : true
		}
	}

	loadOrders = async () => {
		this.setState({loading:true});
		let orders = await Orders.load(User.getToken());
		this.setState({orders, loading:false});
	}

	RenderOrder = ({item, index}) => {
		let count = item.products ? item.products.length : 0;
		let countText = count > 1 ? `${count} itens` : `${count} item`;
		return (
			<TouchableOpacity style={styles.itemContainer} onPress={()=>{NavigationService.navigate('Order', {order_id:item.id})}}>
				<Text style={styles.itemDate}>{`${item.date} - ${item.time}`}</Text>
				<Text style={styles.itemCount}>{countText}</Text>
				<View style={styles.itemFooter}>
					<Text style={styles.itemAmount}>{item.amount.toBRL()}</Text>
					<Text style={{...styles.itemStatus, ...styles[`${item.status}Status`]}}>{item.statusText()}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	onRouteFocus = () => {
		this.loadOrders();
	}

  	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus()}
					/>

				{
				!!this.state.loading ? 
					<View style={{flex:1, justifyContent:'center'}}><ActivityIndicator color='#fff' size='small' /></View>
					:
					(this.state.orders ? 
					<FlatList
						style={styles.flatListStyle}
						data={this.state.orders}
						renderItem={this.RenderOrder}
						keyExtractor={(item)=> item.id.toString()}
						/> : <Text style={styles.noResult}>Você ainda não fez nenhum pedido</Text>)
				}
			</View>
		)
		
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
		justifyContent: 'flex-start',
		backgroundColor: '#336535',
		alignItems:'center',
	},
	flatListStyle : {
		flex: 1,
		width:'100%',
		marginTop:80,
		
		overflow: 'visible',
		paddingHorizontal:15,
		/*alignItems:'stretch'*/
	},
	itemContainer : {
		backgroundColor:'#5B815C',
		borderRadius:6,
		padding:15,
		marginBottom:30,
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
	itemDate : {
		...sharedStyles.font,
		color:'#fff',
		fontWeight:'bold',
		fontSize:18,
	},
	itemCount : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:16,
		color:'#fff',
	},
	itemFooter : {
		flexDirection:'row',
		alignItems:'baseline',
		justifyContent:'space-between',
		marginTop:15,
	},
	itemAmount : {
		...sharedStyles.font,
		fontWeight:'bold',
		fontSize:16,
		color:'#fff',
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
});
