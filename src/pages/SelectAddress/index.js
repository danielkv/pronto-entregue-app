import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/core';

import { Paper, Button } from '../../react-native-ui';
import UserAddresses from './UserAddresses';

export default function SelectAddress() {
	const navigation = useNavigation();

	return (
		<ScrollView keyboardShouldPersistTaps='handled'>
			<Paper>
				<Button
					label='Novo endereço'
					variant='filled'
					color='primary'
					icon='plus'
					onPress={()=>navigation.navigate('TypeAddressScreen')}
				/>
			</Paper>

			<UserAddresses />
		</ScrollView>
	);
}
