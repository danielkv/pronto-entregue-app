import React from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import Address from '../../../../components/Address';
import ErrorBlock from '../../../../components/ErrorBlock';
import LoadingBlock from '../../../../components/LoadingBlock';
import Panel from '../../../../components/Panel';

import { IconButton, Button } from '../../../../react-native-ui';
import { useLoggedUserId } from '../../../../utils/hooks';

import { GET_USER_ADDRESSES } from '../../../../graphql/users';

export default function DeliveryModal({ confirmModal, closeModal }) {
	const loggedUserId = useLoggedUserId();
	const {
		data: { user: { addresses = [] } = {} } = {},
		loading: loadingUserAddresses,
		error
	} = useQuery(GET_USER_ADDRESSES, { variables: { id: loggedUserId } });
	
	const navigation = useNavigation();

	const onPressAddress = (address) => {
		confirmModal({ type: 'delivery', address });
	}
		
	if (loadingUserAddresses) return <LoadingBlock />
	if (error) return <ErrorBlock error={error} />

	return (
		<Panel
			title='Endereço de entrega'
			handleCancel={closeModal}
			HeaderRight={()=><IconButton onPress={()=>{ closeModal(); navigation.navigate('SelectAddressScreen') }} icon='plus' />}
		>
			<View style={{ marginHorizontal: 35 }}>
				
				<View>
					{/* addresses.map(item => <Button key={item.id} onPress={()=>confirmModal({ type: 'takeout' })}>{item.street}</Button>) */}
					{addresses.map((item, index) => (<Address key={index} item={item} onPress={onPressAddress} />))}
				</View>
				<Button variant='filled' onPress={()=>confirmModal({ type: 'takeout' })}>Retirar no local</Button>
			</View>
		</Panel>
	);
}
