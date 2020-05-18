import React from 'react';

import { Chip } from '../../react-native-ui';

export default function ClosedCompanyChip() {
	return (
		<Chip
			variant='outlined'
			label='Fechado'
			style={{ root: { marginRight: 3, height: 20, paddingVertical: 0, paddingHorizontal: 10, borderColor: '#b00' }, text: { fontSize: 13, color: '#b00' } }}
		/>
	);
}
