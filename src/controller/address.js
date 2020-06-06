import { toString, toInteger, isInteger } from 'lodash';

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
		reference: '',
		location: ['', ''],
	}
}

export function extractAddress(address) {
	return {
		name: address.name || '',
		street: address.street,
		number: toString(address.number),
		complement: address.complement,
		zipcode: toString(address.zipcode),
		district: address.district,
		city: address.city,
		state: address.state,
		reference: address.reference,
		location: address.location,
	};
}

export function sanitizeAddress(result) {
	const address = {
		name: result?.name || '',
		street: result.street,
		number: toInteger(result.number),
		complement: result.complement,
		zipcode: isInteger(result.zipcode) ? result.zipcode : toInteger(result.zipcode.replace(/[\D]/g, '')),
		district: result.district,
		city: result.city,
		state: result.state,
		reference: result.reference || '',
		location: result.location,
	}

	if (result.id) address.id = result.id;
	return address;
}