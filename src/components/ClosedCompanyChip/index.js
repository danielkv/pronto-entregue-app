import React from 'react';

import { Chip } from '../../react-native-ui';

export default function ClosedCompanyChip({ allowBuyClosed }) {

	function getLabel (allowBuyClosed) {
		switch (allowBuyClosed) {
			case 'onlyScheduled':
				return 'Aberto para encomendas';
			case 'all':
				return 'Aceita pedidos fechado';
			default:
				return 'Fechado'
		}
	}

	const label = getLabel(allowBuyClosed);
	
	return (
		<Chip
			variant='outlined'
			label={label}
			style={{ root: { marginRight: 3, height: 20, paddingVertical: 0, paddingHorizontal: 8, borderColor: '#b00' }, text: { fontSize: 11, color: '#b00' } }}
		/>
	);
}
