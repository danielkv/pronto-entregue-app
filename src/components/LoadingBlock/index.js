import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Typography } from '../../react-native-ui';
import { BlockContainer } from './styles';

export default function LoadingBlock({ message, size='small' }) {
	return (
		<BlockContainer>
			<ActivityIndicator color='#F11761' size={size} />
			{!!message && <Typography variant='h4' style={{ marginTop: 20 }}>{message}</Typography>}
		</BlockContainer>
	)
}