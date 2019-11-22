import React from 'react';

import NewAddress from './new_address';
import EditAddress from './edit_address';
import { Container, FormContainer } from './styles';

export default function Address({ route }) {
	const address_id = route.params && route.params.address_id;

	return (
		<Container>
			<FormContainer>
				{address_id
					? <EditAddress address_id={address_id} />
					: <NewAddress />}
			</FormContainer>
		</Container>
	);
}
