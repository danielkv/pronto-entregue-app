import React from 'react';

import { Chip } from '../../react-native-ui';

export default function ClosedCompanyChip({ allowBuyClosed }) {
	
	return (
		<Chip
			variant='outlined'
			label={`${allowBuyClosed ? 'Aceita pedidos fechado' : 'Fechado'}`}
			style={{ root: { marginRight: 3, height: 20, paddingVertical: 0, paddingHorizontal: 8, borderColor: '#b00' }, text: { fontSize: 11, color: '#b00' } }}
		/>
	);
}
