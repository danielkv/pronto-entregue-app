import React from 'react';

import { Typography } from '../../react-native-ui';
import { BlockContainer } from './styles';

export default function ErrorBlock({ error }) {
	return (
		<BlockContainer>
			<Typography variant='h3'>Ocorreu um erro</Typography>
			<Typography>{error}</Typography>
		</BlockContainer>
	)
}