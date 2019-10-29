import Connection from '../services/connection';

_info = {};

function getInfo() {
	return _info;
}

async function load () {
	let {data} = await Connection.get('get/business_info');
	_info = data;
}

export default {
	load,
	getInfo,
}