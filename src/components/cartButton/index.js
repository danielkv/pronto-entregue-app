import React from 'react';
import {  Icon } from "react-native-elements";

import { ButtonContainer, ButtonTextContainer, ButtonPriceContainer, ButtonPrice, ButtonTitle } from './styles';

export default function CartButton  ({title, iconSize=24, price=0, forceShowPrice=false, icon, onPress, iconColor='#fff', iconStyle={}, containerStyle={}, titleContainerStyle={}, titleStyle={}, priceContainerStyle={}, priceStyle={}}) {
		
	return (
		<ButtonContainer style={containerStyle} onPress={onPress}>
			<ButtonTextContainer style={titleContainerStyle}>
				{!!icon && <Icon style={iconStyle} type='material-community' name={icon} color={iconColor} size={iconSize} />}
				<ButtonTitle style={titleStyle}>{title}</ButtonTitle>
			</ButtonTextContainer>
			{!!(price || forceShowPrice) && <ButtonPriceContainer style={priceContainerStyle}>
				<ButtonPrice style={priceStyle}>{`R$ ${parseFloat(price).toFixed(2)}`}</ButtonPrice>
			</ButtonPriceContainer>}
		</ButtonContainer>
	);
};