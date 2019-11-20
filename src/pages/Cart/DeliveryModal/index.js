import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

import LoadingBlock from '../../../components/LoadingBlock';
import ErrorBlock from '../../../components/ErrorBlock';
import Panel from '../../../components/Panel';
import Address from '../../../components/Address';
import { TakeoutContainer, TakeoutTitle } from './styles';

import { GET_USER_ADDRESSES } from '../../../graphql/users';


export default function deliveryModal({ confirmModal, closeModal }) {
	const { data: userAddressesData, loading: loadingUserAddresses, error } = useQuery(GET_USER_ADDRESSES);
	const addresses = userAddressesData ? userAddressesData.me.addresses : [];
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
			HeaderRight={()=>(
				<TouchableOpacity onPress={()=>{ closeModal(); navigation.navigate('LoginScreen') }}>
					<Icon type='material-community' name='plus' color='#fff' size={30} />
				</TouchableOpacity>
			)}
		>
			{addresses.map((address, index) => (
				<Address key={index} address={address} onPress={()=>onPressAddress(address)} />
			))}

			<TakeoutContainer onPress={()=>confirmModal({ type: 'takeout' })}>
				<TakeoutTitle>Retirar no local</TakeoutTitle>
			</TakeoutContainer>
		</Panel>
	);
}
