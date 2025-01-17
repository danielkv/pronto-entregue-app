import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';

import { useLoggedUserId, useSelectedAddress } from '../../../controller/hooks';
import { Avatar, useTheme } from '../../../react-native-ui';

import { GET_USER } from '../../../graphql/users';

// import { Container } from './styles';

export default function UserAvatar({ navigation }) {
	const { palette } = useTheme();
	const { location = null } = useSelectedAddress()

	const selectedAddress = useSelectedAddress();
	const loggedUserId = useLoggedUserId();
	const { data: { user = null } = {}, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId }, fetchPolicy: 'cache-first' })

	if (!loggedUserId || !location) return false;

	return (
		<View style={{ marginLeft: 10 }}>
			{loadingUser
				? <ActivityIndicator color={palette.primary.main} />
				: (
					<TouchableOpacity onPress={() => { if (selectedAddress) navigation.navigate('ProfileScreen') }}>
						<Avatar
							image={user?.image || ''}
							alt={user?.fullName || ''}
							size={35}
						/>
					</TouchableOpacity>
				)}
		</View>
	);
}
