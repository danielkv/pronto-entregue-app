import React from 'react';

import { Typography } from '../../../../react-native-ui'
import { Container, BgImage } from './styles';

export default function Product({ item }) {
	console.log(item);
	return (
		<Container>
			<BgImage source={{ uri: item.image }}>
				<Typography>{item.name}</Typography>
			</BgImage>
		</Container>
	);
}
