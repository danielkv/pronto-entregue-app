import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import Address from '../../../../components/Address';
import ErrorBlock from '../../../../components/ErrorBlock';
import LoadingBlock from '../../../../components/LoadingBlock';
import Panel from '../../../../components/Panel';

import { TakeoutContainer, TakeoutTitle } from './styles';

import { LOGGED_USER_ID } from '../../../../graphql/authentication';
import { GET_USER_ADDRESSES } from '../../../../graphql/users';

export default function deliveryModal({ confirmModal, closeModal }) {
	const { data: { loggedUserId } } = useQuery(LOGGED_USER_ID);
	const {
		data: { user: { addresses = [] } = {} } = {},
		loading: loadingUserAddresses,
		error
	} = useQuery(GET_USER_ADDRESSES, { variables: { id: loggedUserId } });
	
	const navigation = useNavigation();

	const onPressAddress = (address) => {
		confirmModal({ type: 'delivery', address });
	}
	
	const renderAddress = ({ item }) => (
		<Address
			address={item}
			onPress={()=>onPressAddress(item)}
		/>
	)
		
	if (loadingUserAddresses) return <LoadingBlock />
	if (error) return <ErrorBlock error={error} />
	return (
		<Panel
			title='Endereço de entrega'
			handleCancel={closeModal}
			HeaderRight={()=>(
				<TouchableOpacity onPress={()=>{ closeModal(); navigation.navigate('CreateAddressScreen') }}>
					<Icon type='material-community' name='plus' color='#fff' size={30} />
				</TouchableOpacity>
			)}
		>

			<FlatList
				renderItem={renderAddress}
				data={addresses}
				keyExtractor={(item, index)=>index.toString()}
			/>

			<TakeoutContainer onPress={()=>confirmModal({ type: 'takeout' })}>
				<TakeoutTitle>Retirar no local</TakeoutTitle>
			</TakeoutContainer>
		</Panel>
	);
}
