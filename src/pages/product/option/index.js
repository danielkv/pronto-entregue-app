import React from 'react';
import { Icon } from 'react-native-elements';

import theme from '../../../theme';
import {
	Container,
	OptionPrice,
	PriceContainer,
	CenterElementContainer,
	OptionTitle,
	TitleContainer,
	OptionIconContainer
} from './styles';

function ProductOption({ centerElement, price, onPress, title, selected, type }) {
	// eslint-disable-next-line no-nested-ternary
	const icon = type === 'single'
		? selected ? 'radiobox-marked' : 'radiobox-blank' :
		selected ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline';

	const textColor = selected ? '#707070' : '#fff';
	const iconColor = selected ? theme.colors.primary : '#000';
	const iconSize = 24;
		
	return (
		<Container onPress={onPress} selected={selected}>
			<TitleContainer>
				{!!icon && (
					<OptionIconContainer>
						<Icon type='material-community' name={icon} color={iconColor} size={iconSize} />
					</OptionIconContainer>
				)}
				<OptionTitle style={{ color: textColor }}>{title}</OptionTitle>
			</TitleContainer>

			{!!centerElement && (
				<CenterElementContainer>
					<centerElement />
				</CenterElementContainer>
			)}

			{!!price && (
				<PriceContainer>
					<OptionPrice h4>{`R$ ${price.toFixed(2).replace('.', ',')}`}</OptionPrice>
				</PriceContainer>
			)}
		</Container>
	);
};

export default React.memo(ProductOption);