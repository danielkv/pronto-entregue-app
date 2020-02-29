import React from 'react';
import { Text } from 'react-native-elements';

import { getErrors } from '../../utils/errors';
import { BlockContainer } from './styles';

export default function ErrorBlock({ error }) {
	return (
		<BlockContainer>
			<Text h1>Ocorreu um erro</Text>
			<Text>{getErrors(error)}</Text>
		</BlockContainer>
	)
}