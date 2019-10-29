import MoneyOnDelivery from '../gateways/MoneyOnDelivery';
import DebitOnDelivery from '../gateways/DebitOnDelivery';

let _payments = [];

function load () {
	let payments = [
		new MoneyOnDelivery(),
		new DebitOnDelivery(),
	];

	_payments = payments;
}

function getMethods () {
	return _payments;
}

function getDefaultMethod() {
	return getMethods()[0];
}

export default {
	load,
	getMethods,
	getDefaultMethod,
};
