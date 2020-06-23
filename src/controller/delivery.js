class DeliveryControl {
	availableStatus(delivery) {
		let status = ['delivering'];

		if (delivery.status === 'waitingDelivery') status.push('canceled')
		if (delivery.status === 'delivering') status.push('delivered')
	
		return status.map(stat => ({ slug: stat, label: this.statusLabel(stat), Icon: this.statusIcon({ ...delivery, status: stat }) }))
	}

	statusIcon(status) {
		// isIn: [['waiting', 'preparing', 'delivery', 'delivered', 'canceled']],
		switch(status) {
			case 'waiting':
				return { type: 'material-community', name: 'clock', color: '#363E5E' }
			case 'waitingDelivery':
				return { name: 'account-clock', type: 'material-community', color: '#363E5E' }
			case 'delivering':
				return { name: 'truck', color: '#363E5E' }
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
			case 'waiting':
				return 'Aguardando';
			case 'preparing':
				return 'Preparando';
			case 'waitingDelivery':
				return 'Aguardando entregador';
			case 'delivering':
				return 'A caminho';
			case 'delivered':
				return 'Entregue';
			case 'canceled':
				return 'Cancelado';
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
			case 'canceled':
				return {
					background: '#f44336',
					text: '#fff'
				};
			case 'waiting':
			default:
				return {
					background: '#000',
					text: '#fff'
				};
		}
	}
}

const DeliveryController = new DeliveryControl();

export default DeliveryController;