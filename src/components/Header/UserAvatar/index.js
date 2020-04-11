import React from 'react';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import { Avatar, useTheme } from '../../../react-native-ui';
import { useLoggedUserId, useSelectedAddress } from '../../../utils/hooks';

import { GET_USER } from '../../../graphql/users';

// import { Container } from './styles';

export default function UserAvatar() {
	const { palette } = useTheme();
	
	const navigation = useNavigation();
	const selectedAddress = useSelectedAddress();
	const loggedUserId = useLoggedUserId();
	const { data: { user = null } = {}, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId }, fetchPolicy: 'cache-first' })

	if (!loggedUserId) return false;

	return (
		loadingUser
			? <ActivityIndicator color={palette.primary.main} />
			: (
				<TouchableOpacity onPress={()=>{if (selectedAddress) navigation.navigate('ProfileRoutes', { screen: 'ProfileScreen' })}}>
					<Avatar
						image={user?.image || ''}
						alt={user?.fullName || ''}
						size={40}
					/>
				</TouchableOpacity>
			)
	);
}
