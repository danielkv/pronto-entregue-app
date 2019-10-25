//import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';
import {ToastAndroid} from 'react-native';

import Connection from '../services/connection';
import Addresses from './Addresses';
import Orders from './Orders';

let _userLoggedIn = false;

let _userData = {
	id:'',
	firstname:'',
	lastname:'',
	email:'',
	phone:'',
	token:null
}

function isUserLoggedIn () {
	return _userLoggedIn;
}

function getToken () {
    return _userData.token;
}

function getUser() {
	let _info = Object.assign({}, _userData);
	return _info;
}

async function loadUserData () {
	await Addresses.load(getToken());
	await Orders.load(getToken());
	return true;
}

async function save() {
	if (_userData.token && _userData.id && _userData.firstname && _userData.lastname && _userData.phone && _userData.email) {
		const responseToken = await AsyncStorage.setItem('@PizzariaDelivery:userData', JSON.stringify(getUser()));
		return responseToken;
	} else {
		throw {code: 'invalid_user_data', message:'Não foi possível criar sessão'};
	}
   
}

async function load () {
	const data = await AsyncStorage.getItem('@PizzariaDelivery:userData');
    if (data) {
		let dataJson = JSON.parse(data);
		try {
			const resp = await Connection.post('jwt-auth/v1/token/validate', null, dataJson.token);
			setUser(dataJson);
			await loadUserData();
			return dataJson;
		} catch (error) {
			if (error.code == 'jwt_auth_invalid_token')
				ToastAndroid.show('Usuário deslogado', ToastAndroid.SHORT);
			 else
				ToastAndroid.show(error.message, ToastAndroid.SHORT);

			logout();
		}
	}
	return false;
}

function setUser (data) {
	if (data.token && data.id && data.firstname && data.lastname && data.phone && data.email) {
    	let userData = {
			token : data.token,
			id : data.id,
			firstname : data.firstname,
			lastname : data.lastname,
			phone : data.phone,
			email : data.email
		};
		_userData = Object.assign(_userData, userData);
		_userLoggedIn = true;
	} else {
		throw {code: 'invalid_user_data', message:'Não foi possível setar os dados de usuário'};
	}
}



async function create_user (params) {
    let response = await Connection.post('register/users', params);
	
	if (response.data.token) {
		setUser(dataJson);
		save();
		return response;
	} else
		throw {code : 'no-token', message: 'O token não foi gerado'};
}

async function update (params) {
	let {data} = await Connection.put('update/user', params, getToken());
	data.token = getToken();
	setUser(data);
	save();
}

async function authenticate (login, password) {
    let response = await Connection.post('jwt-auth/v1/token', {
        username : login,
        password : password
    }).catch(function (error) {
        if (error.response.status === 403) {
            throw {code: error.response.status, message: 'Usuário ou senha incorretos.'}
        } else {
            throw {code: error.response.status, message: 'Ocorreu um erro na autenticação, tente mais tarde'}
        }
	});

    if (response.data.token) {
		setUser(response.data);
		await loadUserData();
		save();
	}
	
	

    return response.data;
}
async function logout() {
	const response = await AsyncStorage.removeItem('@PizzariaDelivery:userData');
	_userData = null;
	_userLoggedIn = false;
	return response;
}

export default {
	logout,
	authenticate,
	create_user,
	update,
	//save,
	load,
	getUser,
	isUserLoggedIn,
	getToken,
}