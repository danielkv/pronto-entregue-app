import React, { useCallback } from 'react';
import { InteractionManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation, useFocusEffect } from '@react-navigation/core';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { useLoggedUserId } from '../../controller/hooks';
import { Paper, Button } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import UserAddresses from './UserAddresses';

import { GET_USER_ADDRESSES } from '../../graphql/users';

export default function SelectAddress() {
	const navigation = useNavigation();
	const userId = useLoggedUserId();

	const { loading: loadingAddresses, error: addressesError, data: { user: { addresses = [] } = {} } = {} }
	= useQuery(GET_USER_ADDRESSES, { skip: !userId, variables: { id: userId }, fetchPolicy: 'cache-and-network' });

	useFocusEffect(useCallback(()=>{

		const task = InteractionManager.runAfterInteractions(() => {
			if (loadingAddresses) return;
		
			if (!addresses.length) navigation.replace('NewAddressScreen');
		});

		return () => task.cancel();
		
	}, [loadingAddresses]));

	if (!addresses.length && loadingAddresses) return <LoadingBlock />

	return (
		<ScrollView keyboardShouldPersistTaps='handled'>
			<Paper>
				<Button
					label='Novo endereço'
					variant='filled'
					color='primary'
					icon='plus'
					onPress={()=>navigation.navigate('AddressRoutes', { screen: 'NewAddressScreen' })}
				/>
			</Paper>

			{loadingAddresses
				? <LoadingBlock />
				: Boolean(addresses.length) && <UserAddresses />}

			{Boolean(addressesError) && <ErrorBlock error={getErrorMessage(addressesError)} />}
		</ScrollView>
	);
}
