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