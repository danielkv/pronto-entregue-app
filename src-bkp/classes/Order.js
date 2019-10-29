import ProductItem from './ProductItem';

export default class OrderItem {
	static WAITING 		= 'waiting';
	static PAYMENT 		= 'payment';
	static PREPARING 	= 'preparing';
	static DELIVERY 	= 'delivery';
	static DELIVERED 	= 'delivered';
	static CANCELED 	= 'canceled';

	constructor (cart) {
		this.amount 		= cart.amount || 0;
		this.discount 		= cart.discount || 0,
		this.payment 		= cart.payment || null;
		this.delivery 		= cart.delivery || null;
		this.observations 	= cart.observations || '';

		this.id 			= cart.id || null;
		this.date			= cart.date || null;
		this.time			= cart.time || null;

		this.setProducts(cart.products);

		this.status 		= cart.status || OrderItem.PAYMENT;
		this.sent			= this.id && this.date && this.time;
	}

	statusText () {
		switch(this.status) {
			case OrderItem.WAITING:
				return 'Aguardando';
			case OrderItem.PAYMENT:
				return 'Aguardando Pagamento';
			case OrderItem.PREPARING:
				return 'Preparando pedido';
			case OrderItem.DELIVERY:
				return 'Saiu para entrega';
			case OrderItem.DELIVERED:
				return 'Entregue';
			case OrderItem.CANCELED:
				return 'Cancelado';
		}
	}

	setId (id) {
		this.id = id;
	}

	setSent(order) {
		this.setId(order.id);
		this.date = order.date;
		this.time = order.time;
		this.sent = true;
	}

	setStatus (status) {
		this.status = status;
	}

	setProducts (products) {
		if (products)
			this.products = products.map(product => {
				let _product;
				if (product instanceof ProductItem) _product = product.clone();
				else _product = new ProductItem(product);

				_product.optionals = _product.getOnlyOptionalsSelected();

				return _product;
			});
		
		return [];
	}

	cancel () {
		this.status = OrderItem.CANCELED;
	}

	getObject() {
		return JSON.parse(JSON.stringify(this));
	}

	clone () {
		return new OrderItem(this.getObject());
	}
}