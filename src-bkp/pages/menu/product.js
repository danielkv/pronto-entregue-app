import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView  } from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Header from '../../navigation/header';
import sharedStyles from '../../sharedStyles';
import SingleOptionals from './singleOptionals';
import VariableOptionals from './variableOptionals';
import OptionsBox from './optionsBox';
import CartButton from '../../components/cartButton';
import ProductItem from '../../classes/ProductItem';
import Cart from '../../classes/Cart';
import NavigationService from '../../NavigationService';

export default class Product extends React.Component {
	static navigationOptions = {
		header : null,
	}

	constructor (props) {
		super(props);

		this.state = {
			product : null,
			loading: false,
			amount : 0,
			quantity: 0,
			observations : '',
		}
	}

	setOptionals = (optionals) => {
		let _product = this.state.product;
		_product.setOptionals(optionals);

		this.setState({
			product:_product,
			amount:_product.getTotalAmount(),
		});
	}

	setQuantity = (quantity) => {
		let _product = this.state.product;
		_product.setQuantity(quantity);

		this.setState({
			quantity:_product.getQuantity(),
			amount:_product.getTotalAmount()
		});
	}
	
	setObservations = (observations) => {
		let _product = this.state.product;
		_product.observations = observations;

		this.setState({product:_product, observations});
	}

	resetProduct = (product) => {
		let _product = product || this.state.product;
		
		_product.reset();

		this.setState({
			product:_product,
			quantity:_product.getQuantity(),
			amount:_product.getTotalAmount(),
			observations : '',
		});
	}

	initProduct = (product) => {
		if (!product) throw {code:'no_product_init', message:'Nenhum produto para iniciar'};
		if (!(product instanceof ProductItem)) throw {code:'is_not_product', message:'Não é um produto'};

		let _product = product.clone();
		

		this.resetProduct(_product);
	}

	checkProduct = () => {
		this.state.product.optionals.forEach(optional => {
			this.verifyMinSelect(optional);
			this.verifyMaxSelect(optional);
		});
		return true;
	}

	checkOptionBeforeSelect = (optional, option) => {
		if (optional.selection_type == 'single') {
			if (option.selected) return false;
			optional.unselectAll();
		} else {
			if (option.selected) return true;

			return this.verifyMaxSelect(optional, 1);
		}
		return true;
	}

	verifyMinSelect = (optional, offset) => {
		if (!offset) offset = 0;

		let min_select = optional.min_select;
		let qtd_selected = optional.getSelectedOptions().length;
		let _qtd_selected = qtd_selected + offset;

		let min_select_text = min_select > 1 ? `${min_select} opções` : `${min_select} opção`;

		if (min_select !== 0 && _qtd_selected < min_select) throw {code:'max_select', message: `${optional.title}: Você deve selecionar ao menos ${min_select_text}`};
	}

	verifyMaxSelect = (optional, offset) => {

		if (!offset) offset = 0;
		let max_select = this.state.product.getOptionalMaxSelection(optional.id);
		if (max_select === false) {
			let _restrictedBy = this.state.product.getOptional(optional.restrict_optional);
			throw {code:'no_restriction_selected', message:`Selecione primeiro o opcional ${_restrictedBy.title}`};
		}

		let qtd_selected = optional.getSelectedOptions().length;
		let _qtd_selected = qtd_selected + offset;

		let max_select_text = max_select > 1 ? `${max_select} opções` : `${max_select} opção`;

		if (max_select !== 0 && _qtd_selected > max_select) throw {code:'max_select', message: `${optional.title}: Você pode selecionar apenas ${max_select_text}`};

		return true;
	}

	onRouteFocus = (payload) => {
		try {
			if (payload.state.params.product) this.initProduct(payload.state.params.product);
			else {
				if (this.state.product === null) throw {code:'no_product', message:'Nenhum produto Selecionado'};
			}
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			NavigationService.goBack();
		}
	}

	render () {
		let {product} = this.state;
		return (
			<View style={styles.container}>
				<NavigationEvents
					onDidFocus={(payload) => this.onRouteFocus(payload)}
					/>
				
				<Header
					headerLeftAction='goBack'
					title={this.props.navigation.getParam('product').title}
					headerRight={() => (
						<TouchableOpacity onPress={() => {NavigationService.navigate('Cart')}} >
							<Icon type='material-community' name='cart' size={24} color='#fff' />
						</TouchableOpacity>
					)}
					/>

				{!!(product && product.optionals) && 

					<View style={{flex:1}}>
						
						<ScrollView style={styles.productContainer}>
							<View style={styles.headerContainer}>
								<ImageBackground source={{uri:product.image}} style={styles.headerImageBackground} >

									<LinearGradient
										colors={['rgba(51,101,53,0)', 'rgba(51,101,53,1)']}
										style={styles.headerLinearGradient}
									>							
										<Text style={styles.headerDesc}>{product.desc}</Text>
									</LinearGradient>

								</ImageBackground>
							</View>

								{product.product_type == 'variable' ?

								<VariableOptionals optionals={product.optionals} onItemPress={(optionalSelected)=>{
									this.optionsBox.setOptional(optionalSelected);
									this.optionsBox.open();
								}} /> :

								<SingleOptionals optionals={product.optionals} onItemPress={(optional, optionSelected)=>{
									if (this.checkOptionBeforeSelect(optional, optionSelected)) {
										optional.switchOptionSelect(optionSelected.id)
										this.setOptionals(this.state.product.optionals);
									}
								}} />}


							<View style={styles.obsContainer}>
								<Text style={styles.obsTitle}>Observações</Text>
								<TextInput value={this.state.observations} style={styles.obsInput} onChangeText={(observations)=>{this.setObservations(observations)}} multiline />
							</View>
						</ScrollView>

						{product.product_type == 'variable' && 
						<OptionsBox
							ref={(box)=>{this.optionsBox=box}}
							onItemPress= {(optional, optionSelected) => {
								return this.checkOptionBeforeSelect(optional, optionSelected);
							}}
							onFinishSelection={(newOptional)=>{
								this.setOptionals(product.setOptional(newOptional));
							}}
							/>
						}

						<View style={styles.addToCartContainer}>
							<View style={styles.quantityContainer}>
								<Text style={styles.quantityTitle}>Quantidade</Text>

								<TouchableOpacity onPress={()=>{
										if (this.state.quantity > 1) {
											let _newQuantity = this.state.quantity-1;
											this.setQuantity(_newQuantity);
										}
									}}>
									<Icon type='material-community' name='minus-circle-outline' size={24} color='#336535' />
								</TouchableOpacity>
								
								<Text style={styles.quantityText}>{this.state.quantity.toString()}</Text>

								<TouchableOpacity onPress={()=> {
										let _newQuantity =this.state.quantity+1;
										this.setQuantity(_newQuantity);
									}}>
									<Icon type='material-community' name='plus-circle-outline' size={24} color='#336535' />
								</TouchableOpacity>
							</View>
							<CartButton
								containerStyle={styles.cartButton}
								title='Adicionar ao carrinho'
								icon='cart-plus'
								forceShowPrice
								price={this.state.amount.toBRL()}
								onPress={()=>{
									try {
										this.checkProduct();
										Cart.addToCart(this.state.product);
										this.resetProduct();
									} catch (error) {
										ToastAndroid.show(error.message, ToastAndroid.SHORT);
									}
								}}
								/>
						</View>

					</View>
				}
				
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
		backgroundColor: '#336535',
	},
	productContainer: {
		flex: 1,
	},
	headerContainer:{
		height:280,
	},
	headerImageBackground:{
		flex:1,
		justifyContent:'flex-end'
	},
	headerLinearGradient:{
		justifyContent:'flex-end',
		paddingTop:40,
		paddingBottom:20,
		paddingHorizontal:20,
	},
	
	headerDesc:{
		...sharedStyles.font,
		textAlign:'left',
		fontSize:14,
		fontWeight:'100',
		color:'#fff',
	},
	obsContainer : {
		borderStyle:'dashed',
		borderTopWidth:2,
		borderTopColor: '#548156',
		paddingHorizontal:30,
		paddingVertical:15
	},
	obsTitle : {
		...sharedStyles.font,
		fontSize:12,
		textAlign:'left',
		fontWeight:'100',
		color : '#fff',
		marginBottom:8,
	},
	obsInput : {
		...sharedStyles.textArea,
	},
	addToCartContainer: {
		padding:10,
		backgroundColor:'#fff',
	},
	quantityContainer: {
		flexDirection:'row',
		justifyContent:'flex-end',
		alignItems:'center',
		marginBottom:15,
	},
	quantityTitle: {
		...sharedStyles.font,
		color:'#666666',
		fontSize:12,
		fontWeight:'100',
		marginRight:15,
	},
	quantityText: {
		marginHorizontal:15,
		...sharedStyles.font,
		color:'#000',
		fontSize:16,
		fontWeight:'bold',
		textAlign:'center',
	},
	cartButton: {
		height:50,
	},
});