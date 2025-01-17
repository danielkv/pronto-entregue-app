import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import LoadingBlock from '../../../components/LoadingBlock';

import { useSelectedAddress, useLoggedUserId } from '../../../controller/hooks';
import { Typography, useTheme, Button, FormHelperText } from '../../../react-native-ui';
import { Container, UserNameContainer, UserName, UserLocationContainer } from './styles';

import { GET_USER } from '../../../graphql/users';

export default function UserInfo() {
	const { palette } = useTheme();
	const selectedAddress = useSelectedAddress();
	const navigation = useNavigation();

	const loggedUserId = useLoggedUserId();
	const { data: { user = null } = {}, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId } });

	return (
		<Container>
			<UserNameContainer>
				{loadingUser
					? <LoadingBlock />
					: Boolean(user) && <UserName variant='h1'>{`Oi,\n${user.firstName}`}</UserName>}
			</UserNameContainer>
			{selectedAddress && (
				<UserLocationContainer>
					<Typography
						variant='subtitle'
						style={{ color: palette.background.dark, marginRight: 2, fontSize: 13 }}
					>
						Você está em
					</Typography>
					<Button
						color='primary'
						variant='filled'
						style={{ button: { height: 30, borderRadius: 15 }, text: { textTransform: 'none' } }}
						icon={{ name: 'map-pin', size: 16 }}
						onPress={()=>navigation.navigate('SelectAddressScreen')}
					>
						{`${selectedAddress.city}, ${selectedAddress.state}`}
					</Button>
					<FormHelperText style={{ text: { color: '#999' }, root: { marginRight: 3, marginTop: 0 } }}>Pressione para alterar</FormHelperText>
				</UserLocationContainer>
			)}
		</Container>
	);
}
