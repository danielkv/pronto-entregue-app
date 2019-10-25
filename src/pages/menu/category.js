import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation';

import sharedStyles from '../../sharedStyles';
import CartButton from '../../components/cartButton';
import NavigationService from '../../NavigationService';
import Connection from '../../services/connection';
import Cart from '../../classes/Cart';
import ProductItem from '../../classes/ProductItem';

export default class HomeScreen extends React.Component {
	static navigationOptions = ({navigation}) => ({
		title : `${navigation.state.params.category.title}`,
		headerLeftAction :'goBack'
	})

	constructor (props) {
		super(props);
		this.state = {
			category : null,
			products : null,
			loading : false,
		}
	}
	
	initProducts = (products_array) => {
		let products = products_array.map((prod) => new ProductItem(prod));
		this.setState({products});
	}

	loadProducts = async (id) => {
		this.setState({ loading: true });
		try {
			let response = await Connection.get('get/products_category', {id:id});
			this.initProducts(response.data);
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			NavigationService.goBack();
		} finally {
			this.setState({ loading: false });
		}
	}

	onRouteFocus = (payload) => {
		if (payload.state.params.category) {
			this.setState({category:payload.state.params.category}, ()=>{
				this.loadProducts(payload.state.params.category.id);
			});
		} else {
			if (this.state.category === null) {
				ToastAndroid.show('Nenhuma categoria selecionada', ToastAndroid.SHORT);
				NavigationService.goBack();
			}
		}
	}

	Product = ({item}) => {
		let openProduct = () => {NavigationService.navigate("Product", {product : item})};
		let countOptionals = Object.entries(item.optionals).length;
		let buttonIcon = countOptionals ? 'page-next-outline' : 'cart-plus';
		let buttonTitle = countOptionals ? 'Ver opções' : 'Colocar no carrinho';
		let buttonPrice = countOptionals ? null : item.price.toBRL();
		let buttonAction = countOptionals ? openProduct : () => {Cart.addToCart(item, 1);}
		
		return (
			<TouchableOpacity style={styles.productContainer} onPress={openProduct}>
				<View style={styles.product}>
					<View style={styles.productImageContainer}>
						<Image style={styles.productImage} source={{uri:item.image}} />
					</View>
					<View style={styles.productInfoContainer}>
						<Text style={styles.productTitle}>{item.title}</Text>
						<Text style={styles.productDesc}>{item.desc}</Text>
					</View>
				</View>
				<CartButton onPress={buttonAction} title={buttonTitle} icon={buttonIcon} price={buttonPrice} containerStyle={{borderTopLeftRadius:0, borderTopRightRadius:0 }} />
			</TouchableOpacity>
		);
	}

	render () {
		return (
			<View style={styles.container}>
				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					/>
				{this.state.loading ? <ActivityIndicator size='small' color='#fff' /> :
				<FlatList
					data={this.state.products}
					renderItem={this.Product}
					keyExtractor={(item) => item.id.toString()}
					/>}
				
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#336535',
		paddingTop:60,
	},
	productContainer : {
		backgroundColor:'#fff',
		borderRadius:6,
		shadowColor: "#000",
		marginVertical:12,
		marginHorizontal:20,
		overflow:'hidden',

		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
	},
	product : {
		overflow:'hidden',
		flexDirection:'row',
	},
	productInfoContainer : {
		flex:1,
		padding:15,
	},
	productImageContainer : {
		
	},
	productImage : {
		height:140,
		resizeMode:'cover',
		aspectRatio:1,
	},
	productTitle : {
		...sharedStyles.font,
		color:'#505050',
		fontSize:18,
		fontWeight:'600',
	},
	productDesc : {
		...sharedStyles.font,
		color:'#BBBBBB',
		fontSize:14,
		fontWeight:'100',
		marginTop:5,
	},
});