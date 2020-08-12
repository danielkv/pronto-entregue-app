class OrderControl {
	availableStatus(order) {
		// ['waiting', 'preparing', 'delivering', 'delivered', 'canceled']

		// initial status
		let status = ['accepted', 'canceled'];

		if (order.status !== 'waiting') {
			status = ['waiting'];

			if (order.scheduledTo) {
				status.push('scheduled')
			} else {
				status.push('preparing')
			}
			
			status = [...status, ...this.getOrderTypesStatus(order.type)]
		}

		const acceptChangeStatusTo = order.scheduledTo ? 'scheduled' : 'preparing';

		return status.map(stat => ({
			slug: stat === 'accepted' ? acceptChangeStatusTo : stat,
			label: OrderController.statusLabel(stat),
			Icon: OrderController.statusIcon(stat)
		}))
	}

	getOrderTypesStatus(type) {
		switch (type) {
			case 'peDelivery':
				return ['waitingDelivery', 'delivering', 'delivered']
			case 'takeout':
				return ['waitingPickUp', 'delivered']
			case 'delivery':
			default:
				return ['delivering', 'delivered']
		}
	}

	statusIcon(status) {
		// isIn: [['waiting', 'preparing', 'delivery', 'delivered', 'canceled']],
		switch(status) {
			case 'accepted':
				return { name: 'check', color: '#363E5E' };
			case 'waiting':
				return { type: 'material-community', name: 'clock', color: '#363E5E' }
			case 'scheduled':
				return { name: 'calendar', type: 'material-community', color: '#363E5E' }
			case 'preparing':
				return { name: 'silverware-spoon', type: 'material-community', color: '#363E5E' }
			case 'waitingDelivery':
				return { name: 'account-clock', type: 'material-community', color: '#363E5E' }
			case 'waitingPickUp':
				return { name: 'bag-checked', type: 'material-community', color: '#363E5E' }
			case 'delivering':
				return { name: 'motorbike', color: '#363E5E', type: 'material-community' }
			case 'delivered':
				return { type: 'material-community', name: 'check-circle', color: '#058F0A' }
			case 'canceled':
				return { type: 'material-community', name: 'close-circle-outline', color: '#E63A3A' }
			default: return '';
		}
	}

	statusLabel(status) {
		// isIn: [['waiting', 'preparing', 'delivering', 'delivered', 'canceled']],
			
		switch(status) {
			case 'accepted':
				return 'Abrir';
			case 'waiting':
				return 'Aguardando';
			case 'scheduled':
				return 'Agendado';
			case 'preparing':
				return 'Preparando';
			case 'waitingDelivery':
				return 'Aguardando entregador';
			case 'waitingPickUp':
				return 'Aguardando retirada';
			case 'delivering':
				return 'A caminho';
			case 'delivered':
				return 'Entregue';
			case 'canceled':
				return 'Cancelar';
			default: return '';
		}
		
	}
	
	statusColors(status) {
		switch (status) {
			case 'delivered':
				return {
					background: '#A4D82B',
					text: '#000'
				};
			case 'delivering':
				return {
					background: '#FFCA39',
					text: '#333'
				};
			case 'scheduled':
				return {
					background: '#ffcc00',
					text: '#333'
				};
			case 'canceled':
				return {
					background: '#f44336',
					text: '#fff'
				};
			case 'preparing':
			case 'waiting':
			default:
				return {
					background: '#000',
					text: '#fff'
				};
		}
	}
}

const OrderController = new OrderControl();

export default OrderController;