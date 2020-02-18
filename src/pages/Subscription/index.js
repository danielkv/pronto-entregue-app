import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import logoResource from '../../assets/images/logo-vertical-v2.png';
import EditUser from './edit_user';
import NewUser from './new_user';
import { Container, LogoImage, ContainerScroll } from './styles';

export default function login({ route }) {
	const user_id = route.params && route.params.user_id;

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<ContainerScroll>
				<Container>
					<LogoImage source={logoResource} />

					{user_id
						? <EditUser user_id={user_id} />
						: <NewUser />}
				</Container>
			</ContainerScroll>
		</KeyboardAvoidingView>
	);
}