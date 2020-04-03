import { isInteger } from 'lodash';

export function createEmptyAddress () {
	return {
		name: '',
		street: '',
		number: '',
		complement: '',
		zipcode: '',
		district: '',
		city: '',
		state: '',
		location: ['', ''],
	}
}

export function extractAddress(address) {
	return {
		name: address.name || '',
		street: address.street,
		number: parseInt(address.number),
		complement: address.complement,
		zipcode: isInteger(address.zipcode) ? address.zipcode : address.zipcode ? parseInt(address.zipcode.replace(/[\D]/g, '')) : '',
		district: address.district,
		city: address.city,
		state: address.state,
		location: address.location,
	};
}

export function sanitizeAddress(result) {
	const address = {
		name: result?.name || '',
		street: result.street,
		number: parseInt(result.number),
		complement: result.complement,
		zipcode: isInteger(result.zipcode) ? result.zipcode : parseInt(result.zipcode.replace(/[\D]/g, '')),
		district: result.district,
		city: result.city,
		state: result.state,
		location: result.location,
	}

	if (result.id) address.id = result.id;
	return address;
}