import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { useRoute } from '@react-navigation/core';

import logoResource from '../../assets/images/logo-vertical-v2.png';
import EditUser from './edit_user';
import NewUser from './new_user';
import { Container, LogoImage, ContainerScroll } from './styles';

export default function Subscription() {
	const { params: { userId = null } = {} } = useRoute();

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<ContainerScroll>
				<Container>
					<LogoImage source={logoResource} />

					{userId
						? <EditUser userId={userId} />
						: <NewUser />}
				</Container>
			</ContainerScroll>
		</KeyboardAvoidingView>
	);
}