import React from 'react';
import { ActivityIndicator } from 'react-native';

import { BlockContainer } from './styles';

export default function LoadingBlock() {
	return (
		<BlockContainer>
			<ActivityIndicator color='#B95A02' size={24} />
		</BlockContainer>
	)
}