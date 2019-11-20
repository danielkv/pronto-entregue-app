import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button } from 'react-native-elements';

import { checkCondition } from '../../utils';
import {
	ContainerScroll,
	Container,
	UserHeader,
	UserName,
	UserEmail,
	ContentContainer,
} from './styles';
import LoadingBlock from '../../components/LoadingBlock';

import { IS_USER_LOGGED_IN, LOGGED_USER } from '../../graphql/authentication';

export default function Profile({ navigation }) {
	const { data: { isUserLoggedIn } } = useQuery(IS_USER_LOGGED_IN);
	const { data: loggedUserData, loading: loadingUser } = useQuery(LOGGED_USER);

	const loggedUser = loggedUserData ? loggedUserData.me : null;
	const userInitials = loggedUser ? loggedUser.first_name.substr(0, 1).toUpperCase() + loggedUser.last_name.substr(0, 1).toUpperCase() : '';

	if (loadingUser) return <LoadingBlock />
	if (checkCondition(isUserLoggedIn)) return <></>;

	return (
		<ContainerScroll>
			<Container>
				<UserHeader>
					<Avatar size={90} rounded title={userInitials} />
					<UserName h1>{loggedUser.full_name}</UserName>
					<UserEmail h3>{loggedUser.email}</UserEmail>
				</UserHeader>
				<ContentContainer>
					<Button title='Meus Endereços' onPress={()=>navigation.navigate('AddressListScreen')} />
					<Button title='Meus Pedidos' onPress={()=>navigation.navigate('OrderListScreen')} />
				</ContentContainer>
			</Container>
		</ContainerScroll>
	);
}
