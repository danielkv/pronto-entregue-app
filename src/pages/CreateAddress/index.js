import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import NewAddress from './new_address';
import EditAddress from './edit_address';
import { Container, ContainerScroll } from './styles';

export default function Address({ route }) {
	const address_id = route.params && route.params.address_id;

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<ContainerScroll>
				<Container>
					{address_id
						? <EditAddress address_id={address_id} />
						: <NewAddress />}
				</Container>
			</ContainerScroll>
		</KeyboardAvoidingView>
	);
}
