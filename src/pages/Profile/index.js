import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Icon } from 'react-native-elements';

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
	const user_id = loggedUser ? loggedUser.id : null

	useEffect(()=>{
		if (user_id) {
			navigation.setParams({
				headerRight: (
					<TouchableOpacity onPress={()=>navigation.navigate('SubscriptionScreen', { user_id })}>
						<Icon type='material-community' name='pencil' color='#fff' />
					</TouchableOpacity>
				)
			});
		}
	}, [navigation, user_id]);

	if (loadingUser) return <LoadingBlock />
	if (checkCondition(isUserLoggedIn, navigation)) return <></>;

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
