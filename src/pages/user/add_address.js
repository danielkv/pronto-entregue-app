import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Picker, Text, View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';

import sharedStyles from '../../sharedStyles';
import Header from '../../navigation/header';
import TextInput from '../../components/textInput';
import CustomPicker from '../../components/picker';
import Validation from '../../validation';
import NavigationService from '../../NavigationService';

import User from '../../classes/User';
import Addresses from '../../classes/Addresses';
import Delivery from '../../classes/Delivery';

export default class AddAddress extends Component {
	static navigationOptions = {
		header : null
	}

	headerRight = () => (
		this.state.loading ? <ActivityIndicator color='#fff' size='small' /> : 
		<TouchableOpacity onPress={() => {this.initAddAddress()}}>
			<Icon name='check' size={24} color="#fff" />
		</TouchableOpacity>
	)

	constructor (props) {
		super(props);

		this.validation = new Validation({
			fields : {
				title : {required:true},
				street : {required:true},
				number : {required:true},
				district : {required:true},
				city : {required:true},
				zipcode: {required:true},
				/*state : {
					required:true,
					validation : {
						function : function (value, data) {
							if (value == data.city) return true;
							return false;
						},
						message : 'As senhas não coincidem'
					}
				},*/
			}
		});

		this.initialData = {
			title : '',
			street : '',
			number : '',
			complement : '',
			city : '',
			state : 'sc',
			district : '',
			zipcode : '',
			isMainAddress : true
		};

		this.state = {
			data : this.initialData,
			loading: false,
			validation : {
				errors : {
					title : false,
					street : false,
					number : false,
					complement : false,
					city : false,
					state : false,
					district : false,
					zipcode : false,
				},
				code : '',
				message : false
			},
		}
	}	

	initAddAddress =  async () => {
		
		let {errors, error} = this.validation.validate(this.state.data);
		let {validation} = this.state;

		validation.errors = Object.assign(validation.errors, errors);
		validation.code = null;
		validation.message = false;

		if (!error) {
			try {
				this.setState({ loading: true });
				if (Delivery.getPrice(this.state.data.zipcode) === false) throw {code:'no_delivery_price', message:'Infelizmente não entregamos nesse endereço.'};
				let address = await Addresses.add(this.state.data, User.getToken());
				this.setState({data: this.initialData});
				if (this.fromCart) {
					NavigationService.navigate('Cart', {selectedAddress: address});
				} else
					NavigationService.navigate('Addresses');
			} catch (error) {
				validation.code = error.code;
				validation.message = error.message;
			} finally {
				this.setState({ loading: false, validation });
			}
		} else {
			Promise.resolve(false);
			this.setState({validation});
		}
	}

	renderStates = () => {
		//["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"]
		return (
			<CustomPicker
				mode='dialog'
				containerStyle={{width:100}}
				selectedValue={this.state.data.state}
				onValueChange={(value) => {this.onChange('state', value)}}
				>
				<Picker.Item label="AC" value="ac" />
				<Picker.Item label="AL" value="al" />
				<Picker.Item label="AM" value="am" />
				<Picker.Item label="AP" value="ap" />
				<Picker.Item label="BA" value="ba" />
				<Picker.Item label="CE" value="ce" />
				<Picker.Item label="DF" value="df" />
				<Picker.Item label="ES" value="es" />
				<Picker.Item label="GO" value="go" />
				<Picker.Item label="MA" value="ma" />
				<Picker.Item label="MT" value="mt" />
				<Picker.Item label="MS" value="ms" />
				<Picker.Item label="MG" value="mg" />
				<Picker.Item label="PA" value="pa" />
				<Picker.Item label="PB" value="pb" />
				<Picker.Item label="PR" value="pr" />
				<Picker.Item label="PE" value="pe" />
				<Picker.Item label="PI" value="PI" />
				<Picker.Item label="RJ" value="rj" />
				<Picker.Item label="RN" value="rn" />
				<Picker.Item label="RO" value="RO" />
				<Picker.Item label="RS" value="rs" />
				<Picker.Item label="RR" value="RR" />
				<Picker.Item label="SC" value="sc" />
				<Picker.Item label="SE" value="se" />
				<Picker.Item label="SP" value="sp" />
				<Picker.Item label="TO" value="to" />
			</CustomPicker>
		);
	}

	onChange = (key, value) => {
		let {data} = this.state;
		data[key] = value;
		
		this.setState({data});
	}

	onRouteFocus = (payload) => {
		this.fromCart = (payload.state.params && payload.state.params.fromCart) ? payload.state.params.fromCart : false;
	}

	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					/>

				<Header title='Adicionar endereço' headerLeftAction='goBack' headerRight={() => (this.headerRight())} />

				<Image style={styles.imageStyle} source={require('../../images/add_address.png')} />

				{!!this.state.validation.message && <Text style={styles.errorStyle}>{this.state.validation.message}</Text>}
				
				<TextInput
					errors = {this.state.validation.errors.title.errors}
					placeholder='Identificação (Casa, Apartamento, etc)'
					onChangeText={(value) => {this.onChange('title', value)}}
					value={this.state.data.title}
					editable={!this.state.loading}
				/>
				<TextInput
					errors = {this.state.validation.errors.street.errors}
					placeholder='Rua'
					autoCorrect={false}
					onChangeText={(value) => {this.onChange('street', value)}}
					value={this.state.data.street}
					editable={!this.state.loading}
				/>
				<TextInput
					errors = {this.state.validation.errors.number.errors}
					placeholder='Número'
					keyboardType='numeric'
					onChangeText={(value) => {this.onChange('number', value)}}
					value={this.state.data.number}
					editable={!this.state.loading}
				/>
				<TextInput
					errors = {this.state.validation.errors.complement.errors}
					placeholder='Complemento'
					onChangeText={(value) => {this.onChange('complement', value)}}
					value={this.state.data.complement}
					editable={!this.state.loading}
				/>
				<View style={styles.cityContainer}>
					<TextInput
						containerStyle={{width:'auto', flex:1, marginRight:10}}
						errors = {this.state.validation.errors.city.errors}
						placeholder='Cidade'
						autoCorrect={false}
						onChangeText={(value) => {this.onChange('city', value)}}
						value={this.state.data.city}
						editable={!this.state.loading}
					/>
					<this.renderStates />
				</View>
				<TextInput
					errors = {this.state.validation.errors.district.errors}
					placeholder='Bairro'
					autoCorrect={false}
					onChangeText={(value) => {this.onChange('district', value)}}
					value={this.state.data.district}
					editable={!this.state.loading}
				/>
				<TextInput
					errors = {this.state.validation.errors.zipcode.errors}
					placeholder='CEP'
					keyboardType='numeric'
					onChangeText={(value) => {this.onChange('zipcode', value)}}
					value={this.state.data.zipcode}
					editable={!this.state.loading}
				/>
				

				<CheckBox
					checkedIcon='checkbox-marked-outline'
					uncheckedIcon='checkbox-blank-outline'
					iconType='material-community'
					title='Endereço principal'
					checkedColor='#FF9100'
					uncheckedColor='#fff'
					checked={this.state.data.isMainAddress}
					onPress={() => this.onChange('isMainAddress', !this.state.data.isMainAddress)}
					containerStyle={{backgroundColor:'transparent', borderWidth:0, width:'100%'}}
					textStyle={{color:'#fff', ...sharedStyles.font, fontWeight:'100'}}
					/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
		justifyContent: 'center',
		backgroundColor: '#336535',
		alignItems:'center',
		padding:40,
	},
	errorStyle : {
		...sharedStyles.errorMessage,
		marginVertical:5,
	},
	imageStyle : {
		maxWidth:'60%',
		height: 60,
		width: 190,
		resizeMode : 'contain',
		marginBottom: 30,
	},
	cityContainer : {
		flexDirection:'row'
	},
});
