import React, { useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';

import { useQuery } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/core';

import LoadingBlock from '../../components/LoadingBlock';

import { checkCondition } from '../../utils';
import { useLoggedUserId } from '../../utils/hooks';
import {
	ContainerScroll,
	Container,
	UserHeader,
	UserName,
	UserEmail,
	ContentContainer,
} from './styles';

import { IS_USER_LOGGED_IN, LOGGED_USER_ID } from '../../graphql/authentication';
import { GET_USER } from '../../graphql/users';

export default function Profile({ navigation }) {
	const { data: { isUserLoggedIn } } = useQuery(IS_USER_LOGGED_IN);
	const { data: { loggedUserId }, loading: loadingUserId } = useQuery(LOGGED_USER_ID);
	const { data: loggedUserData, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId } });

	const loggedUser = loggedUserData ? loggedUserData.user : null;
	const userInitials = loggedUser ? loggedUser.firstName.substr(0, 1).toUpperCase() + loggedUser.lastName.substr(0, 1).toUpperCase() : '';
	const userId = useLoggedUserId()

	useEffect(()=>{
		if (userId) {
			navigation.setParams({
				headerRight: (
					<TouchableOpacity onPress={()=>navigation.navigate('SubscriptionScreen', { userId })}>
						<Icon type='material-community' name='pencil' color='#fff' />
					</TouchableOpacity>
				)
			});
		}
	}, [navigation, userId]);

	// navigate to HomeScreen if user is not logged in
	useFocusEffect(
		useCallback(() => {
			checkCondition(isUserLoggedIn, navigation, 'Você não está logado')
		}, [isUserLoggedIn])
	);

	if (loadingUser || loadingUserId) return <LoadingBlock />

	return (
		<ContainerScroll>
			<Container>
				<UserHeader>
					<Avatar size={90} rounded title={userInitials} />
					<UserName h1>{loggedUser.fullName}</UserName>
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
