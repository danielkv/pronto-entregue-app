import React from 'react';
import { View } from 'react-native';

import { useQuery, useMutation } from "@apollo/react-hooks";
import { useNavigation } from '@react-navigation/core';

import Address from '../../../components/Address'
import ErrorBlock from "../../../components/ErrorBlock";
import LoadingBlock from "../../../components/LoadingBlock";

import { Paper, Typography } from '../../../react-native-ui';
import { getErrors } from '../../../utils/errors';
import { useLoggedUserId } from '../../../utils/hooks'

import { SET_SELECTED_ADDRESS } from '../../../graphql/addresses';
import { GET_USER_ADDRESSES } from "../../../graphql/users";

// import { Container } from './styles';

export default function UserAddresses() {
	// get user addresses
	const userId = useLoggedUserId();
	const navigation = useNavigation();
	
	const { loading: loadingAddresses, error: addressesError, data: { user: { addresses = [] } = {} } = {} } = useQuery(GET_USER_ADDRESSES, { variables: { id: userId } });
	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);

	function handleAddressPress(address) {
		setSelectedAddress({ variables: { address } })
			.then(()=>{
				navigation.navigate('HomeRoutes')
			})
	}
		

	if (loadingAddresses) return <LoadingBlock />;
	if (addressesError) return <ErrorBlock error={getErrors(addressesError)} />;

	if (!addresses.length) return;

	return (
		<Paper>
			<Typography variant='title' style={{ marginBottom: 20 }}>Endereços cadastrados</Typography>
			<View>
				{addresses.map((addr, index) => <Address onPress={handleAddressPress} divider={index < addresses.length-1} key={index} address={addr} />)}
			</View>
		</Paper>
	);
}
