import React from 'react';
import { View, Alert } from 'react-native';

import { useQuery, useMutation } from "@apollo/react-hooks";
import { useNavigation } from '@react-navigation/core';

import Address from '../../../components/Address'
import ErrorBlock from "../../../components/ErrorBlock";
import LoadingBlock from "../../../components/LoadingBlock";

import { Paper, Typography, Icon, useTheme } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';
import { useLoggedUserId } from '../../../utils/hooks'

import { SET_SELECTED_ADDRESS } from '../../../graphql/addresses';
import { GET_USER_ADDRESSES } from "../../../graphql/users";

export default function UserAddresses() {
	const { palette } = useTheme();
	
	// get user addresses
	const userId = useLoggedUserId();
	const navigation = useNavigation();
	
	const { loading: loadingAddresses, error: addressesError, data: { user: { addresses = [] } = {} } = {} } = useQuery(GET_USER_ADDRESSES, { variables: { id: userId } });
	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);

	function handleAddressPress(address) {
		setSelectedAddress({ variables: { address } })
			.then(()=>{
				navigation.dangerouslyGetParent().reset({
					index: 0,
					routes: [{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } }]
				})
			})
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro', getErrorMessage(err))
			})
	}
		

	if (!userId) return false;
	if (loadingAddresses) return <LoadingBlock />;
	if (addressesError) return <ErrorBlock error={getErrorMessage(addressesError)} />;

	if (!addresses.length) return false;

	return (
		<>
			<View style={{ alignItems: "center", marginHorizontal: 35 }}>
				<Typography variant='h5' style={{ textAlign: 'center', color: palette.background.dark }}>ou selecione um endereço cadastrado</Typography>
				<Icon name='chevron-down' color={palette.background.dark} size={30} />
			</View>
			<Paper>
				<Typography variant='title' style={{ marginBottom: 20 }}>Endereços cadastrados</Typography>
				<View>
					{addresses.map((addr, index) => <Address onPress={handleAddressPress} divider={index < addresses.length-1} key={index} item={addr} />)}
				</View>
			</Paper>
		</>
	);
}
