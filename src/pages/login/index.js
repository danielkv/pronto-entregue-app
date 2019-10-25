import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import sharedStyles from '../../sharedStyles';
import Button from '../../components/button';
import TextInput from '../../components/textInput';
import User from '../../classes/User';
import Header from '../../navigation/header';
import NavigationService from '../../NavigationService';


export default class Login extends Component {
	state = {
		login: 'diego',
		password: '123456',
		loading: false,
		errors : {
			login : false,
			password : false,
			message : false
		},
	}

	initLogin = async () => {
		const {login, password} = this.state;
		
		if (!login || !password) {
			this.setState({
				errors: {login:!login, password:!password, message : 'Preencha os campos obrigatórios',}
			});
			return;
		}

		try {
			this.setState({ loading: true });
			await User.authenticate(this.state.login, this.state.password);
			NavigationService.getDrawerComponent().reload();

			if (this.fromCart)
				NavigationService.navigate('Cart');
			else
				NavigationService.navigate('Menu');
		} catch (error) {
			this.setState({
				errors: {message : error.message}
			});
		} finally {
			this.setState({ loading: false });
		}
	}

	onRouteFocus = ({state}) => {
		this.fromCart = (state.params && state.params.fromCart) ? state.params.fromCart : false;
	}

	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents
					onWillFocus={(payload) => this.onRouteFocus(payload)}
					/>
				<Header title="Login" />
				
				<Image style={styles.logoStyle} source={require('../../images/logo-pizzaria-branco.png')} />
				{!!this.state.errors.message && <Text style={styles.errorStyle}>{this.state.errors.message}</Text>}
				<TextInput
					error = {this.state.errors.login}
					placeholder='Login'
					onChangeText={(login) => this.setState({ login })}
					value={this.state.login}
				/>
				<TextInput
					error = {this.state.errors.password}
					secureTextEntry
					placeholder='Senha'
					onChangeText={(password) => this.setState({ password })}
					value={this.state.password}
				/>
				
				<TouchableOpacity style={styles.forgotPassword}>
					<Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
				</TouchableOpacity>
				<Button
					size='big'
					onPress={this.initLogin}
					title="Login"
				/>
				<Button
					labelStyle={{color:'#336535'}}
					size='small'
					onPress={()=>{NavigationService.navigate('Subscription', {fromCart:this.fromCart})}}
					title="Quero me cadastrar"
				/>
				{!!this.state.loading && <Text>Carregando...</Text>}
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
		maxWidth:'70%',
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
