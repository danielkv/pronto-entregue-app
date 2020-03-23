import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import { useMutation } from "@apollo/react-hooks";
import { useNavigation } from '@react-navigation/core';

import Address from '../../components/Address';

import { Paper, Typography, TextField, useTheme, Icon, FormHelperText, Button, Divider } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import UserAddresses from './UserAddresses';

import { SEARCH_ADDRESS } from "../../graphql/addresses";

export default function SearchAddress() {
	const { palette } = useTheme();
	const navigation = useNavigation();
	const [addressSearch, setAddressSearch] = useState('');
	const [askFormOpen, setAskFormOpen] = useState(false);
	const [formAked, setFormAked] = useState({ street: '', number: '' });
	const [errorFormAsked, setErrorFormAsked] = useState({ street: '', number: '' });
	const [selectedAddress, setSelectedAddress] = useState(null);
	
	// setup search mutation
	const [searchAddress, { loading: loadingSearch, error: searchError, data: { searchAddress: addressesFound = [] } = {} } = {}]= useMutation(SEARCH_ADDRESS, { fetchPolicy: 'no-cache' })
	
	// SEARCH
	function handleSearch(search) {
		if (search)	searchAddress({ variables: { search: search } })
	}
	
	// MODAL
	function handleCloseModal() {
		setAskFormOpen(false)
	}

	function handleSearchWithNumber() {
		if ((!formAked.number && !selectedAddress.number) || (!formAked.street && !selectedAddress.street)) {
			if (!formAked.number) setErrorFormAsked({ ...errorFormAsked, number: 'Digite o número' })
			if (!formAked.street) setErrorFormAsked({ ...errorFormAsked, street: 'Digite o nome da rua' })
		} else {
			let newSearch = addressSearch;
			if (formAked.street) newSearch += `, ${formAked.street}`;
			if (formAked.number) newSearch += `, ${formAked.number}`;

			setAddressSearch(newSearch);
			handleSearch(newSearch);
			setAskFormOpen(false);
		}
	}

	// ADDRESS
	function handleSelectAddress(address) {
		setSelectedAddress(address);
		if (!address.number || !address.street) {
			setAskFormOpen(true)
		} else
			navigation.navigate('PickLocationScreen', { address })
	}
	// rua joao quartieiro, 43, sombrio sc

	return (
		<ScrollView>
			<Modal
				isVisible={askFormOpen}
				onModalHide={handleCloseModal}
				onSwipeComplete={handleCloseModal}
				onBackButtonPress={handleCloseModal}
				onBackdropPress={handleCloseModal}
				animationIn='fadeInUp'
				animationOut='fadeOutDown'
				style={{ marginHorizontal: 30 }}
				swipeDirection='down'
			>
				<Paper>
					<Typography variant='h3' style={{ fontWeight: "bold", marginBottom: 8 }}>Faltaram alguns dados para encontrar seu endereço</Typography>
					<Typography variant='h5' style={{ marginBottom: 10 }}>Digite os dados abaixo</Typography>
					{!!askFormOpen && !selectedAddress.street && <TextField
						label='Rua, avenida, etc'
						onChangeText={(text)=>setFormAked((form)=>({ ...form, street: text }))}
						error={!!errorFormAsked.street}
						helperText={!!errorFormAsked.street && errorFormAsked.street}
						style={{ inputContainer: { backgroundColor: '#f0f0f0' } }}
					/>}
					<TextField
						label='Número'
						onChangeText={(text)=>setFormAked((form)=>({ ...form, number: text }))}
						error={!!errorFormAsked.number}
						helperText={!!errorFormAsked.number && errorFormAsked.number}
						style={{ inputContainer: { backgroundColor: '#f0f0f0' } }}
					/>
					<Button icon={{ name: 'search' }} label='Buscar' color='secondary' variant='filled' onPress={handleSearchWithNumber} />
				</Paper>
			</Modal>

			<Paper>
				<Typography variant='title' style={{ marginBottom: 20 }}>Busque sua localização</Typography>
				<TextField
					label='Pesquisar'
					value={addressSearch}
					onChangeText={(text)=>setAddressSearch(text)}
					placeholderTextColor={palette.background.dark}
					disabled={loadingSearch}
					returnKeyType='search'
					enablesReturnKeyAutomatically
					onSubmitEditing={({ nativeEvent: { text } }) => handleSearch(text)}
					style={{
						inputContainer: {
							backgroundColor: palette.background.main
						}
					}}
					actionButton={Boolean(addressSearch) && <Icon name='x' color='#888' />}
					actionButtonOnPress={()=> setAddressSearch('')}
				/>
				<Button
					label='Buscar'
					variant='filled'
					color='primary'
					icon='search'
					onPress={()=>handleSearch(addressSearch)}
				/>
				<Button
					label='Encontrar no mapa'
					variant='outlined'
					onPress={()=>navigation.navigate('PickLocationScreen', { pickUserLocation: true })}
				/>
			</Paper>
			{!!searchError && <FormHelperText error>{getErrorMessage(searchError)}</FormHelperText>}

			{loadingSearch
				? <ActivityIndicator color={palette.primary.main} size='large' />
				: addressesFound.length && addressSearch
					? (
						<Paper>
							<Typography variant='title'>Endereços encontrados</Typography>
							<Typography variant='subtitle' style={{ marginBottom: 20 }}>Selecione um dos endereços abaixo</Typography>
							<View>
								{addressesFound.map((addr, index) => <Address onPress={handleSelectAddress} divider={index < addressesFound.length -1} key={index} address={addr} />)}
							</View>
							<View>
								<Divider />
								<Typography style={{ color: '#777', textAlign: 'center', marginVertical: 10 }}>Não encontrou o endereço que procurava?</Typography>
								<Button
									label='Encontrar no mapa'
									variant='outlined'
									//icon='map'
									onPress={()=>navigation.navigate('PickLocationScreen', { pickUserLocation: true })}
								/>
							</View>
						</Paper>
					)
					: addressSearch
						? (
							<Paper variant='transparent' style={{ alignItems: 'center' }}>
								<Icon name='alert-circle' color={palette.background.dark} size={30} />
								<Typography variant='h4' style={{ textAlign: 'center', color: palette.background.dark }}>Nenhum endereço foi encontrado, tente digitar mais informações</Typography>
							</Paper>
						)
						: (
							<>
								<View style={{ alignItems: "center", marginHorizontal: 35 }}>
									<Icon name='chevron-up' color={palette.background.dark} size={30} />
									<Typography variant='h5' style={{ textAlign: 'center', color: palette.background.dark }}>Busque seu endereço acima ou selecione um endereço cadastrado</Typography>
									<Icon name='chevron-down' color={palette.background.dark} size={30} />
								</View>
								<UserAddresses />
							</>
						)}
		</ScrollView>
	);
}
