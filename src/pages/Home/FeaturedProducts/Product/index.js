import React from 'react';

import { Typography } from '../../../../react-native-ui'
import { Container, BgImage } from './styles';

export default function Product({ item, config }) {
	return (
		<Container>
			<BgImage config={config} source={{ uri: item.image }}>
				<Typography>{item.name}</Typography>
			</BgImage>
		</Container>
	);
}
