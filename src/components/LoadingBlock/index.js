import React from 'react';
import { ActivityIndicator } from 'react-native';

import { BlockContainer, BlockMessage } from './styles';

export default function LoadingBlock({ message }) {
	return (
		<BlockContainer>
			<ActivityIndicator color='#F11761' size='small' />
			{!!message && <BlockMessage>{message}</BlockMessage>}
		</BlockContainer>
	)
}