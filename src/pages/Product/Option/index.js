import React from 'react';
import { View } from 'react-native';

import { Typography, Icon, useTheme, Chip } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';
import {
	Container,
	OptionIconContainer
} from './styles';

function ProductOption({ option, onPress, type }) {
	const { palette } = useTheme();

	const icon = type === 'single'
		? option.selected ? 'check-circle' : 'circle'
		: option.selected ? 'check-square' : 'square';

	const iconColor = option.selected ? palette.primary.main : '#000';
	const iconSize = 22;
		
	return (
		<Container onPress={onPress} selected={option.selected}>

			<OptionIconContainer>
				<Icon name={icon} color={iconColor} size={iconSize} />
			</OptionIconContainer>

			<View style={{ flex: 1, marginTop: 7, marginRight: 7 }}>
				<Typography style={{ color: '#655A51', fontSize: 16 }}>{option.name}</Typography>
				{Boolean(option.description) && <Typography style={{ fontSize: 14 }} variant='subtitle'>{option.description}</Typography>}
			</View>

			{!!option.price && (
				
				<Chip
					color='secondary'
					style={{
						root: { height: 38, backgroundColor: option.selected ? palette.secondary.main : 'transparent', paddingHorizontal: 12 },
						text: { color: '#333', fontSize: 13 }
					}}
					label={BRL(option.price).format()} />
			)}
			

		</Container>
	);
}

export default React.memo(ProductOption);