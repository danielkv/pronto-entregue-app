import Connection from '../services/connection';

import Delivery from '../shippings/Delivery';
import Pickup from '../shippings/PickUp';

let _areas = [];

function getAreas() {
	if (_areas.length) return _areas;
	else throw {code:'no_area_loaded', message:'Nenhuma área de entrega carregada'};
}

async function load ()  {
	let response = await Connection.get('get/shipping_areas');
	
	_areas = response.data;

	return _areas;
}

function getPrice(user_zipcode) {
	let price = 0;
	user_zipcode = parseInt(user_zipcode.replace('-', '').replace(' ', ''));
	
	let area_match = getAreas().find(area => {
		let zipcode = area.zipcodes.find(zip => {
			
			if (zip.type == 'set') {
				return user_zipcode >= zip.zipcode.start && user_zipcode <= zip.zipcode.end;
			} else if (zip.type == 'joker') {
				return user_zipcode.toString().startsWith(zip.zipcode.start.toString());
			} else {
				return user_zipcode == zip.zipcode;
			}
		});
		return zipcode;
	});

	if (area_match) price = area_match.price;
	else price = false;
	
	return price;
}

function getMethods(addresses) {
	let methods = addresses.map(address => getAddressMethod(address));
	
	methods.push(new Pickup({
		title : 'Retirar no local',
		type : 'pickup',
		price : 0
	}));

	return methods;
}

function getAddressMethod(address) {
	if (!address) return null;
	return new Delivery({
		title : address.title,
		type : 'delivery',
		price : getPrice(address.zipcode),
		address : address,
	});
}

export default {
	getAreas,
	load,
	getPrice,
	getMethods,
	getAddressMethod
}