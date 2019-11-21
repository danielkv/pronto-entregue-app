import React from 'react';

import NewAddress from './new_address';
import { Container, FormContainer } from './styles';

export default function Address({ route }) {
	const address_id = route.params && route.params.address_id;

	return (
		<Container>
			<FormContainer>
				{address_id
					? false
					: <NewAddress />}
			</FormContainer>
		</Container>
	);
}
