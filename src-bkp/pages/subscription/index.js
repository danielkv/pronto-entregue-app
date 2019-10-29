import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {Icon} from 'react-native-elements';

import sharedStyles from '../../sharedStyles';
import Button from '../../components/button';
import TextInput from '../../components/textInput';
import User from '../../classes/User';
import Validation from '../../validation';
import Header from '../../navigation/header';
import NavigationService from '../../NavigationService';


export default class Login extends Component {
	constructor (props) {
		super(props);

		this.validation = new Validation({
			fields : {
				firstname : {required:true},
				lastname : {required:true},
				phone : {required:true},
				email : {required:true},
				password : {required:true},
				repeatPassword : {
					validation : {
						function : function (value, data) {
							if (value == data.password) return true;
							return false;
						},
						message : 'As senhas não coincidem'
					}
				},
			}
		});

		this.cleanData = {
			firstname : '',
			lastname : '',
			phone : '',
			email : '',
			password : '',
			repeatPassword : '',
		}
		this.initialHeaderTitle = 'Cadastrar';
		this.editingHeaderTitle = 'Alterar meus dados';

		this.state = {
			editing : false,
			data : this.cleanData,
			loading: false,
			validation : {
				errors : {
					firstname : false,
					lastname : false,
					phone : false,
					email : false,
					password : false,
					repeatPassword : false,
				},
				code : '',
				message : false
			},
		}
	}	

	saveUser = async () => {
		
		let {errors, error} = this.validation.validate(this.state.data);

		let {validation} = this.state;
		validation.errors = errors;
		validation.code = null;
		validation.message = false;

		if (!error) {
			try {
				this.setState({ loading: true });

				if (this.state.editing) {
					await User.update(this.state.data);
				} else {
					await User.create_user(this.state.data);
				}

				NavigationService.getDrawerComponent().reload();

				if (this.fromCart)
					NavigationService.navigate('Cart');
				else
					NavigationService.navigate(this.state.editing ? 'User' : 'Menu');
			} catch (error) {
				if (error.code == 'existing_user_login' || error.code == 'existing_user_email') {
					validation.errors.email.errors = {
						email_exists : {code:error.code, message:error.message}
					}
				} else {
					validation.code = error.code;
					validation.message = error.message;
				}
			} finally {
				this.setState({ loading: false, validation });
			}
		} else {
			Promise.resolve(false);
			this.setState({validation});
		}
	}

	onChange = (key, value) => {
		let {data} = this.state;
		data[key] = value;
		this.setState({data});
	}

	onRouteFocus = ({state}) => {
		this.fromCart = (state.params && state.params.fromCart) ? state.params.fromCart : false;

		if (state.params && state.params.editUser && state.params.editData) {
			let editData = Object.assign(Object.assign({}, this.cleanData), state.params.editData);
			//this.settingUp = true;
			let fields = Object.assign({}, this.validation.settings.fields);
			fields.password = {required:false};
			this.validation.setOptions({fields});
			this.setState({editing: true, data:editData}, ()=> {});
		}
		
	}

	onRouteBlur = () => {
		this.props.navigation.setParams({editUser:false, editData:null});
		
		this.validation.resetOptions();
		let {errors} = this.validation.resetErrors();
		let {validation} = this.state;
		validation.errors = errors;
		validation.code = null;
		validation.message = false;

		this.setState({ loading: false, validation });
		this.setState({editing: false, data:this.cleanData});
	}

	headerRight = () => {
		if (this.state.loading) return (<ActivityIndicator color='#fff' size='small' />);

		if (this.state.editing) return (<TouchableOpacity onPress={this.saveUser} >
			<Icon type='material-community' name='check' color='#fff' size={24} />
		</TouchableOpacity>);
		
		return false;
	}
	

	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					onDidBlur={(payload) => this.onRouteBlur(payload)}
					/>

				<Header
					headerLeftAction={this.state.editing ? 'goBack' : 'Menu'}
					title={this.state.editing ? this.editingHeaderTitle : this.initialHeaderTitle}
					headerRight={() => (this.headerRight())}
					/>
				
				<Image style={styles.logoStyle} source={require('../../images/logo-pizzaria-branco.png')} />
				{!!this.state.validation.message && <Text style={styles.errorStyle}>{this.state.validation.message}</Text>}
				<TextInput
					errors = {this.state.validation.errors.firstname.errors}
					placeholder='Nome'
					onChangeText={(value) => {this.onChange('firstname', value)}}
					value={this.state.data.firstname}
				/>
				<TextInput
					errors = {this.state.validation.errors.lastname.errors}
					placeholder='Sobrenome'
					onChangeText={(value) => {this.onChange('lastname', value)}}
					value={this.state.data.lastname}
				/>
				<TextInput
					errors = {this.state.validation.errors.phone.errors}
					placeholder='Telefone'
					onChangeText={(value) => {this.onChange('phone', value)}}
					value={this.state.data.phone}
				/>
				<TextInput
					errors = {this.state.validation.errors.email.errors}
					placeholder='Email'
					onChangeText={(value) => {this.onChange('email', value)}}
					value={this.state.data.email}
				/>
				<TextInput
					errors = {this.state.validation.errors.password.errors}
					placeholder='Senha'
					secureTextEntry
					onChangeText={(value) => {this.onChange('password', value)}}
					value={this.state.data.password}
				/>
				<TextInput
					errors = {this.state.validation.errors.repeatPassword.errors}
					secureTextEntry
					displayErrors={1}
					placeholder='Repetir Senha'
					onChangeText={(value) => {this.onChange('repeatPassword', value)}}
					value={this.state.data.repeatPassword}
				/>
				
				{!this.state.editing &&
				<Button
					size='big'
					onPress={this.saveUser}
					title="Cadastrar"
				/>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#336535',
		alignItems:'center',
		padding:40,
	},
	errorStyle : {
		...sharedStyles.errorMessage,
		marginVertical:5,
	},
	logoStyle : {
		maxWidth:'50%',
		height: 120,
		width: 120,
		resizeMode : 'contain',
		marginBottom: 20,
	},
	forgotPassword : {
		marginVertical:20,
		width:'100%'
	},
	forgotPasswordText : {
		textAlign : 'right',
		color: '#fff',
		fontSize:16,
		fontWeight:'100',
		...sharedStyles.font
	},
});
