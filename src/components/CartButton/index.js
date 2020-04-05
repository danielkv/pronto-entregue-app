import React from 'react';

import { Icon } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import { ButtonContainer, ButtonTextContainer, ButtonPriceContainer, ButtonPrice, ButtonTitle } from './styles';

export default function CartButton({ title, iconSize = 24, price = 0, forceShowPrice = false, icon, onPress, disabled=false }) {
	return (
		<ButtonContainer onPress={onPress} disabled={disabled}>
			<ButtonTextContainer>
				{!!icon && <Icon name={icon} color='#fff' size={iconSize} />}
				<ButtonTitle>{title}</ButtonTitle>
			</ButtonTextContainer>
			{!!(price || forceShowPrice) && (
				<ButtonPriceContainer>
					<ButtonPrice>{BRL(price).format()}</ButtonPrice>
				</ButtonPriceContainer>
			)}
		</ButtonContainer>
	);
}