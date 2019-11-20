import React from 'react';
import { ActivityIndicator } from 'react-native';

import { BlockContainer, BlockMessage } from './styles';

export default function LoadingBlock({ message }) {
	return (
		<BlockContainer>
			<ActivityIndicator color='#B95A02' size={24} />
			{!!message && <BlockMessage>{message}</BlockMessage>}
		</BlockContainer>
	)
}