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
						{!!address?.name && <Typography variant='h4'>{address.name}</Typography>}
						{!!address?.street && <Typography variant='h4' style={{ fontFamily: "Roboto-Bold" }}>{`${address.street}${address.number ? `, ${address.number}` : ''}`}</Typography>}
						{!!address?.complement && <Typography variant='subtitle'>{address.complement}</Typography>}
						{!!address?.reference && <Typography variant='subtitle'>{address.reference}</Typography>}
						{!!address?.district && <Typography variant='subtitle'>{address.district}</Typography>}
						{!!address?.city && <Typography variant='subtitle'>{`${address.city} ${address.state}`}</Typography>}
						{!!address?.zipcode && <Typography variant='subtitle'>{address.zipcode}</Typography>}
					</TextBlock>
				</Container>
			</WrapperComponent>
			{divider && <Divider />}
		</>
	);
}
