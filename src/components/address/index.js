import React from 'react';

import {
	Container,
	Title,
	AddressInfo,
} from './styles';

export default function Address({ onPress, address: { name, street, number, city, state, zipcode, district } }) {
	return (
		<Container onPress={onPress}>
			<Title>{name}</Title>
			<AddressInfo>{`${street}, ${number}`}</AddressInfo>
			<AddressInfo>{district}</AddressInfo>
			<AddressInfo>{`${city} ${state}`}</AddressInfo>
			<AddressInfo>{zipcode}</AddressInfo>
		</Container>
	);
}
