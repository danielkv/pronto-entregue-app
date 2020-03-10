import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { useTheme, Icon, Typography, Divider } from '../../react-native-ui';
import {
	Container,
	IconBlock,
	TextBlock
} from './styles';


export default function Address({ divider=false, onPress, item: address }) {
	const { palette } = useTheme()
	const WrapperComponent = onPress ? TouchableOpacity : View;

	return (
		<>
			<WrapperComponent onPress={()=>onPress(address)}>
				<Container>
					<IconBlock>
						<Icon name='map-pin' color={palette.background.dark} />
					</IconBlock>
					<TextBlock>
						{!!address.name && <Typography variant='h4' style={{ fontWeight: "bold" }}>{address.name}</Typography>}
						{!!address.street && <Typography variant='h4' style={{ fontWeight: "bold" }}>{`${address.street}${address.number ? `, ${address.number}` : ''}`}</Typography>}
						{!!address.complement && <Typography variant='h5'>{address.complement}</Typography>}
						{!!address.district && <Typography variant='h5'>{address.district}</Typography>}
						{!!address.city && <Typography variant='h5'>{`${address.city} ${address.state}`}</Typography>}
						{!!address.zipcode && <Typography variant='h5'>{address.zipcode}</Typography>}
					</TextBlock>
				</Container>
			</WrapperComponent>
			{divider && <Divider />}
		</>
	);
}
