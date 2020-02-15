import React from 'react';
import { Icon } from 'react-native-elements';

import theme from '../../../theme';
import {
	Container,
	OptionPrice,
	PriceContainer,
	OptionTitle,
	TitleContainer,
	OptionIconContainer
} from './styles';

function ProductOption({ option, onPress, type }) {
	// eslint-disable-next-line no-nested-ternary
	const icon = type === 'single'
		? option.selected ? 'radiobox-marked' : 'radiobox-blank'
		: option.selected ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline';

	const textColor = option.selected ? '#707070' : '#fff';
	const iconColor = option.selected ? theme.palette.primary : '#000';
	const iconSize = 24;
		
	return (
		<Container onPress={onPress} selected={option.selected}>
			<TitleContainer>
				{!!icon && (
					<OptionIconContainer>
						<Icon type='material-community' name={icon} color={iconColor} size={iconSize} />
					</OptionIconContainer>
				)}
				<OptionTitle style={{ color: textColor }}>{option.name}</OptionTitle>
			</TitleContainer>

			{!!option.price && (
				<PriceContainer>
					<OptionPrice h4>{`R$ ${option.price.toFixed(2).replace('.', ',')}`}</OptionPrice>
				</PriceContainer>
			)}
		</Container>
	);
}

export default React.memo(ProductOption);