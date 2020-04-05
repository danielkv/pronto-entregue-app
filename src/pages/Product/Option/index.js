import React from 'react';

import { Typography, Icon, useTheme, Chip } from '../../../react-native-ui';
import {
	Container,
	TitleContainer,
	OptionIconContainer
} from './styles';
import { BRL } from '../../../utils/currency';

function ProductOption({ option, onPress, type }) {
	const { palette } = useTheme();

	const icon = type === 'single'
		? option.selected ? 'check-circle' : 'circle'
		: option.selected ? 'check-square' : 'square';

	const iconColor = option.selected ? palette.primary.main : '#000';
	const iconSize = 22;
		
	return (
		<Container onPress={onPress} selected={option.selected}>
			<TitleContainer>
				<OptionIconContainer>
					<Icon name={icon} color={iconColor} size={iconSize} />
				</OptionIconContainer>

				<Typography style={{ color: '#655A51', fontSize: 14 }}>{option.name}</Typography>
			</TitleContainer>

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