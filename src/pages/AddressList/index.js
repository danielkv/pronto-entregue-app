import React, { useEffect } from 'react';
import { FlatList, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Icon } from 'react-native-elements';

import Address from '../../components/Address';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';
import { Container } from './styles';

import { GET_USER_ADDRESSES, REMOVE_USER_ADDRESS } from '../../graphql/users';
import { getErrors } from '../../utils/errors';
import { LOGGED_USER_ID } from '../../graphql/authentication';

export default function AdressList({ navigation }) {
	useEffect(()=>{
		navigation.setParams({
			headerRight: (
				<TouchableOpacity onPress={()=>navigation.navigate('CreateAddressScreen')}>
					<Icon type='material-community' name='plus' color='#fff' />
				</TouchableOpacity>
			)
		});
	}, []);

	const { data: loggedUserIdData } = useQuery(LOGGED_USER_ID);
	const {
		data: userAddressesData,
		loading: loadingUserAddresses,
		error
	} = useQuery(GET_USER_ADDRESSES, { variables: { id: loggedUserIdData.loggedUserId } });
	const addresses = userAddressesData ? userAddressesData.user.addresses : [];

	const [
		removeAddress,
		{
			loading:
			loadingRemoveAddress
		}
	] = useMutation(REMOVE_USER_ADDRESS, { refetchQueries: [{ query: GET_USER_ADDRESSES, variables: { id: loggedUserIdData.loggedUserId } }] })

	const handleRemoveAddress = (id) => () => {
		Alert.alert(
			'Confirmação',
			'Tem certeza que deseja remover esse endereço?',
			[
				{
					text: 'Sim',
					onPress: ()=>{
						removeAddress({ variables: { id } })
							.catch((err) => {
								Alert.alert(
									'Ocorreu um erro',
									getErrors(err)
								)
							})
					}
				},
				{ text: 'Cancelar' }
			]
		)
	}

	const renderAddress = ({ item }) => (
		<Address
			rightComponent={(
				<>
					<Button
						disabled={loadingRemoveAddress}
						type='clear'
						icon={{ type: 'material-community', name: 'pencil', color: '#fff' }}
						onPress={()=>navigation.navigate('CreateAddressScreen', { address_id: item.id })}
						buttonStyle={{ backgroundColor: 'transparent' }}
						containerStyle={{ borderRadius: 50 }}
					/>
					<Button
						disabled={loadingRemoveAddress}
						type='clear'
						icon={{ type: 'material-community', name: 'delete', color: '#fff' }}
						onPress={handleRemoveAddress(item.id)}
						buttonStyle={{ backgroundColor: 'transparent' }}
						containerStyle={{ borderRadius: 50 }}
					/>
				</>
			)}
			address={item}
		/>
	)

	if (loadingUserAddresses) return <LoadingBlock />;
	if (error) return <ErrorBlock error={error} />;

	return (
		<Container>
			{loadingRemoveAddress && <ActivityIndicator color='#fff' />}
			<FlatList
				renderItem={renderAddress}
				data={addresses}
				keyExtractor={(item, index)=>index.toString()}
			/>
		</Container>
	);
}
