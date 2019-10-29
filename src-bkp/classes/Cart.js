import {ToastAndroid} from 'react-native';
import ProductItem from './ProductItem';
import Delivery from './Delivery';
import Addresses from './Addresses';
import Payments from './Payments';
//import Gateway from '../gateways/gateway';

Number.prototype.toBRL = function () {
	return 'R$ ' + this.toFixed(2).replace('.',',');
}

let _cart = {};

function init(cart) {
	if (cart) {
		try {
			setCart(cart);
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	} else
		resetCart();

	try {
		if (!_cart.delivery) setDelivery(Delivery.getAddressMethod(Addresses.getMainAddress()));
	} catch (error) {
		ToastAndroid.show(error.message, ToastAndroid.SHORT);
	} finally {
		if (!_cart.payment) setPayment(Payments.getDefaultMethod());
		
		updateCart();
	}
}

function resetCart () {
	_cart = {
		amount : 0,
		discount : 0,
		products: [],
		payment : null,
		delivery : null,
		observations : null,
	};
}

function setCart(cart) {
	if (cart) {
		cart.products = cart.products.map(product => {
			if (!(product instanceof ProductItem)) return new ProductItem(product);
			return product;
		});
		_cart = Object.assign({}, _cart, cart);
	}
}
function getCart() {
	return _cart;
}

function updateCart () {
	updateAmount();
}

function updateAmount () {
	_cart.amount = getTotalAmount();
}

function getTotalAmount () {
	let amount = 0;
	_cart.products.forEach((product) => {
		amount += product.getTotalAmount();
	});

	if (_cart.delivery && _cart.delivery.price) amount += _cart.delivery.price;
	if (_cart.discount) amount -= _cart.discount;

	return amount;
}

function removeFromCart (product_index) {
	/*let product_index = findProductIndex(product.id);
	if (!product_index) throw {code:'product_not_found', message:'Produto não encotrado no carrinho'};*/

	_cart.products.splice(product_index, 1);

	return _cart;
}

function addToCart(product) {

	if (!(product instanceof ProductItem)) throw {code:'is_not_product', message:'Não é um produto'};

	let exists = false;

	if (!product.optionals.length) {
		exists = findProductIndex(product.id);
	}

	if (exists === false) {
		_cart.products.push(product.clone());
	} else {
		_cart.products[exists].quantity += product.quantity;
	}

	updateCart();

	ToastAndroid.show('Produto adicionado ao carrinho', ToastAndroid.SHORT);
	return product;
}

function findProductIndex (product_id) {
	let index = getCart().products.findIndex((row) => row.id == product_id);
	return index === -1 ? false : index;
}

function setDelivery(delivery) {
	if (!delivery) return false;
	if (delivery.price === false) {
		throw {code: 'no_delivery_price', message:'Infelizmente não entregamos nesse endereço, mas você ainda pode optar por Retirar em nosso estabelecimento'};
	}

	_cart.delivery = delivery;

	updateCart();

	return delivery;
}

function setPayment(payment) {
	_cart.payment = payment || null;
	updateCart();
	return _cart.payment;
}

function check () {
	let _cart = getCart();
	if (!_cart.amount) throw {code: 'no_amount', message: 'Não há valor definido no carrinho'};
	if (!_cart.products.length) throw {code: 'no_products in_cart', message: 'Não há nenhum entrega selecionada'};
	if (!_cart.delivery) throw {code: 'no_delivery_method', message: 'Não há nenhum entrega selecionada'};
	if (!_cart.payment) throw {code: 'no_payment_method', message: 'Não há nenhuma forma de pagamento selecionada'};
	return true;
}

export default {
	check,
	init,
	getCart,
	updateCart,
	addToCart,
	removeFromCart,
	setDelivery,
	setPayment
}