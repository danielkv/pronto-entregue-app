import theme from '../theme';

export const getStatusText = (status) => {
	switch (status) {
	case 'waiting':
		return 'Aguardando';
	case 'preparing':
		return 'Preparando';
	case 'delivering':
		return 'Na Entrega'
	case 'delivered':
		return 'Entregue';
	case 'canceled':
		return 'Cancelado';
	default:
		return '';
	}
}

export const getStatusColors = (status) => {
	switch (status) {
	case 'delivered':
		return {
			background: '#fff',
			text: '#000'
		};
	case 'delivery':
		return {
			background: '#FFCA39',
			text: '#000'
		};
	case 'canceled':
		return {
			background: theme.colors.error,
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