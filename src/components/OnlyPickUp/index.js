import React from 'react';

import { Chip } from '../../react-native-ui';

export default function OnlyPickUp({ text='Apenas Retirada' }) {
	return (
		<Chip
			variant='filled'
			label={text}
			style={{ root: { height: 20, paddingVertical: 0, paddingHorizontal: 10, backgroundColor: '#ecb22e' }, text: { fontSize: 13, color: '#fff' } }}
		/>
	);
}
