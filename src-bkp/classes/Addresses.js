import Connection from '../services/connection';

let _addresses = [];

function getAddresses() {
	if (_addresses.length)
		return _addresses;
	else
		return false;
}

async function load (token)  {
	if (token) {
		let response = await Connection.get('get/address', null, token);
		
		if (response.data)
			_addresses = response.data;
	}
	return _addresses;
}

async function update (data, token) {
	if (!token) throw {code:'no_token', message:'Nenhum token definido'};

	await Connection.put('update/address', data, token);
}

async function _delete (data, token) {
	if (!token) throw {code:'no_token', message:'Nenhum token definido'};

	let response = await Connection.delete('delete/address', data, token);
	let address_index = _addresses.findIndex(address => address.id == data.id);
	_addresses.splice(address_index, 1);
	return _addresses;
}

async function add (data, token) {
	if (!token) throw {code:'no_token', message:'Nenhum token definido'};

	let response = await Connection.post('add/address', data, token);
	_addresses.push(response.data);
	return response.data;
}

function getMainAddress() {
	return _addresses.find(address => address.isMainAddress); 
}

export default {
	load,
	update,
	delete:_delete,
	add,

	getMainAddress,
	getAddresses,
	
}