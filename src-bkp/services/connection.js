import axios from 'axios';

let api = axios.create({
	baseURL : 'https://iocus.com.br/delivery/wp-json/',
	//baseURL : 'http://192.168.56.1:80/delivery/wp-json/',
	timeout: 30000,
});


async function post (endpoint, params, token) {
	let _config = {};
	if (token) {
		_config.headers = {
			Authorization : `Bearer ${token}`
		}
	}	

	let response = await api.post(endpoint, params, _config).catch(function (error) {
		
		if (error.code == 'ECONNABORTED') throw {code:'timeout', message : 'Infelizmente nosso servidor está com alguma instabilidade no momento.'};
		if (error.response && error.response.data) 
			throw {code : error.response.data.code, message: error.response.data.message};
		else
			throw {code : error.code, message: error.message};
	});

	return response;
}

async function put (endpoint, params, token) {
	let _config = {};
	if (token) {
		_config.headers = {
			Authorization : `Bearer ${token}`
		}
	}
	let response = await api.put(`${endpoint}`, params, _config).catch(function (error) {
		if (error.code == 'ECONNABORTED') throw {code:'timeout', message : 'Infelizmente nosso servidor está com alguma instabilidade no momento.'};

		if (error.response && error.response.data) 
			throw {code : error.response.data.code, message: error.response.data.message};
		else
			throw {code : error.code, message: error.message};
	});

	return response;
}

async function _delete (endpoint, params, token) {
	let _params = params || {};
	let _config = {};
	if (token) {
		_config.headers = {
			Authorization : `Bearer ${token}`
		}
	}
	let response = await api.delete(`${endpoint}`, {params: _params, ..._config}).catch(function (error) {
		if (error.code == 'ECONNABORTED') throw {code:'timeout', message : 'Infelizmente nosso servidor está com alguma instabilidade no momento.'};
		throw {code : error.code, message: error.message};
	});

	return response;
}

async function get (endpoint, params, token) {
	let _params = params || {};
	let _config = {};
	if (token) {
		_config.headers = {
			Authorization : `Bearer ${token}`
		}
	}

	let response = await api.get(`${endpoint}`, {params:_params, ..._config}).catch(function (error) {
		if (error.code == 'ECONNABORTED') throw {code:'timeout', message : 'Infelizmente nosso servidor está com alguma instabilidade no momento.'};
		throw {code : error.response.data.code, message: error.response.data.message};
	});
	
	return response;
}

export default {
	get,
	delete:_delete,
	put,
	post,
}