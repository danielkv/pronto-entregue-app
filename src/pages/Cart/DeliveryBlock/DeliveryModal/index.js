import React from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import Address from '../../../../components/Address';
import ErrorBlock from '../../../../components/ErrorBlock';
import LoadingBlock from '../../../../components/LoadingBlock';
import Panel from '../../../../components/Panel';

import { useLoggedUserId } from '../../../../controller/hooks';
import { IconButton, Button, Typography } from '../../../../react-native-ui';

import { GET_USER_ADDRESSES } from '../../../../graphql/users';

export default function DeliveryModal({ confirmModal, closeModal, loading, acceptTakeout }) {
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
	if (error) return <ErrorBlock error={error} />

	const opacity = (loading || loadingUserAddresses) ? .2 : 1;

	return (
		<Panel
			title='Endereço de entrega'
			handleCancel={closeModal}
			HeaderRight={()=><IconButton onPress={()=>{ closeModal(); navigation.navigate('SelectAddressScreen') }} icon='plus' />}
		>
			<View style={{ marginHorizontal: 35, opacity }}>
				{acceptTakeout && <Button variant='filled' onPress={()=>confirmModal({ type: 'takeout' })}>Retirar no local</Button>}
				<View>
					<Typography style={{ marginVertical: 10 }} variant='title'>Receber em</Typography>
					<View>
						{addresses.map((item, index) => (<Address key={index} item={item} onPress={onPressAddress} />))}
					</View>
				</View>
			</View>
			{(loading || loadingUserAddresses) && <View style={{ width: '100%', height: '100%', position: "absolute" }}>
				<LoadingBlock />
			</View>}
		</Panel>
	);
}
