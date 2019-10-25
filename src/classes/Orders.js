import Connection from '../services/connection';
import Order from './Order';

let _orders = [];

function getOrders() {
	if (_orders.length)
		return _orders;
	else
		return false;
}

function getOrder(order_id) {
	return getOrders().find(order => order.id == order_id);
}

async function load (token)  {
	if (token) {

		let response = await Connection.get('get/orders', null, token);
		
		if (response.data)
			_orders = response.data.map(ord => new Order(ord));
	}
	return _orders;
}

async function save (order, token) {
	if (!token) throw {code:'no_token', message:'Nenhum token definido'};
	if (!(order instanceof Order)) throw {code: 'is_not_order', message: 'Não é um Pedido'};

	let response = await Connection.put('update/order', {order:order}, token);

	return response;
	//await load();
}

async function add (order, token) {
	if (!token) throw {code:'no_token', message:'Nenhum token definido'};
	if (!(order instanceof Order)) throw {code: 'is_not_order', message: 'Não é um Pedido'};

	let {data:savedOrder} = await Connection.post('add/order', {order: order}, token);
	order.setSent(savedOrder);
	_orders.unshift(order);
	return order;
}


export default {
	load,
	save,
	add,
	getOrders,
	getOrder,
}