import React from 'react';
import { Icon } from 'react-native-elements';

import { ButtonContainer, ButtonTextContainer, ButtonPriceContainer, ButtonPrice, ButtonTitle } from './styles';

export default function CartButton({ title, iconSize = 24, price = 0, forceShowPrice = false, icon, onPress }) {
	return (
		<ButtonContainer onPress={onPress}>
			<ButtonTextContainer>
				{!!icon && <Icon type='material-community' name={icon} color='#fff' size={iconSize} />}
				<ButtonTitle>{title}</ButtonTitle>
			</ButtonTextContainer>
			{!!(price || forceShowPrice) && (
				<ButtonPriceContainer>
					<ButtonPrice>{`R$ ${parseFloat(price).toFixed(2)}`}</ButtonPrice>
				</ButtonPriceContainer>
			)}
		</ButtonContainer>
	);
}