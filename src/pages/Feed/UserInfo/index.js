import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import LoadingBlock from '../../../components/LoadingBlock';

import { Typography, useTheme, Button } from '../../../react-native-ui';
import { useSelectedAddress, useLoggedUserId } from '../../../utils/hooks';
import { Container, UserNameContainer, UserName, UserLocationContainer } from './styles';

import { GET_USER } from '../../../graphql/users';

export default function UserInfo() {
	const { palette } = useTheme();
	const selectedAddress = useSelectedAddress();
	const navigation = useNavigation();

	const loggedUserId = useLoggedUserId();
	const { data: { user = null } = {}, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId } })

	return (
		<Container>
			<UserNameContainer>
				{loadingUser
					? <LoadingBlock />
					: <UserName variant='h1'>{`Oi,\n${user.firstName}`}</UserName>}
			</UserNameContainer>
			{selectedAddress && (
				<UserLocationContainer>
					<Typography
						variant='subtitle'
						style={{ color: palette.background.dark }}
					>
						Você está em
					</Typography>
					<Button
						color='primary'
						variant='filled'
						style={{ button: { height: 30 }, text: { textTransform: 'none' } }}
						icon={{ name: 'map-pin', size: 16 }}
						onPress={()=>navigation.navigate('SelectAddressScreen', { screen: 'SearchAddressScreen' })}
					>
						{`${selectedAddress.city}, ${selectedAddress.state}`}
					</Button>
				</UserLocationContainer>
			)}
		</Container>
	);
}
