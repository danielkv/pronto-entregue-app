import React from 'react';

import { Icon, useTheme, Typography } from '../../../react-native-ui';
import { Container, IconBlock, TextBlock } from './styles';

export default function AddressResult({ address }) {
	const { palette } = useTheme();
	return (
		<Container>
			<IconBlock>
				<Icon name='map-pin' color={palette.background.dark} />
			</IconBlock>
			<TextBlock>
				<Typography variant='h4' style={{ fontWeight: "bold" }}>{`${address.street}, ${address.number}`}</Typography>
				<Typography variant='h5'>{address.district}</Typography>
				<Typography variant='h5'>{`${address.city} ${address.state}`}</Typography>
				<Typography variant='h5'>{address.zipcode}</Typography>
			</TextBlock>
		</Container>
	);
}
