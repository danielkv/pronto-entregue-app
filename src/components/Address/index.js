import React from 'react';

import {
	Container,
	TouchableContainer,
	Title,
	AddressInfo,
	RightComponent
} from './styles';

export default function Address({ rightComponent, onPress, address: { name, street, number, city, state, zipcode, district } }) {
	const Wrapper = onPress ? TouchableContainer : Container;
	return (
		<Wrapper onPress={onPress}>
			<Title>{name}</Title>
			<AddressInfo>{`${street}, ${number}`}</AddressInfo>
			<AddressInfo>{district}</AddressInfo>
			<AddressInfo>{`${city} ${state}`}</AddressInfo>
			<AddressInfo>{zipcode}</AddressInfo>
			
			{!!rightComponent && (
				<RightComponent>
					{rightComponent}
				</RightComponent>
			)}
		</Wrapper>
	);
}
