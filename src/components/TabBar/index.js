import React from 'react';

import MenuItem from './MenuItem';
import { Container } from './styles';

export default function TabBar(props) {
	return (
		<Container {...props}>
			<MenuItem selected icon='home' label='Home' screenName='HomeRoutes' />
			<MenuItem icon='shopping-bag' label='Cesta' screenName='HomeRoutes' />
			<MenuItem icon='settings' label='Opções' screenName='HomeRoutes' />
		</Container>
	);
}
