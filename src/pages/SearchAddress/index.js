import React, { useState } from 'react';
import { ActivityIndicator, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import { useMutation } from "@apollo/react-hooks";
import { useNavigation } from '@react-navigation/core';

import Address from '../../components/Address';
import LoadingBlock from '../../components/LoadingBlock';

import { Paper, Typography, TextField, useTheme, Icon, FormHelperText, Button } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import UserAddresses from './UserAddresses';

import { SEARCH_ADDRESS } from "../../graphql/addresses";

const askedInitialState = { street: '', number: '' };

export default function SearchAddress() {
	const { palette } = useTheme();
	const navigation = useNavigation();
	const [addressSearch, setAddressSearch] = useState('');
	const [askFormOpen, setAskFormOpen] = useState(false);
	const [formAsked, setFormAsked] = useState(()=>askedInitialState);
	const [errorFormAsked, setErrorFormAsked] = useState(()=>askedInitialState);
	const [selectedAddress, setSelectedAddress] = useState(null);
	
	// setup search mutation
	const [searchAddress, { loading: loadingSearch, error: searchError, data: { searchAddress: addressesFound = [] } = {} } = {}]= useMutation(SEARCH_ADDRESS, { fetchPolicy: 'no-cache' })
	
	// SEARCH
	function handleSearch(search) {
		setFormAsked(()=>askedInitialState);
		setErrorFormAsked(()=>askedInitialState);
		setSelectedAddress(null);

		if (search)	searchAddress({ variables: { search: search } })
	}

	function handleResetSearch () {
		setAddressSearch('');
		setFormAsked(()=>askedInitialState);
		setErrorFormAsked(()=>askedInitialState);
		setSelectedAddress(null);
	}
	
	// MODAL
	function handleCloseModal() {
		setAskFormOpen(false)
	}

	function handleSearchWithNumber() {
		if ((!formAsked.number && !selectedAddress.number) || (!formAsked.street && !selectedAddress.street)) {
			if (!formAsked.number && !selectedAddress.number) setErrorFormAsked({ ...errorFormAsked, number: 'Digite o número' })
			if (!formAsked.street && !selectedAddress.street) setErrorFormAsked({ ...errorFormAsked, street: 'Digite o nome da rua' })
		} else {
			let newSearch = addressSearch;
			if (formAsked.street) newSearch += `, ${formAsked.street}`;
			if (formAsked.number) newSearch += `, ${formAsked.number}`;

			setErrorFormAsked(()=>askedInitialState);
			searchAddress({ variables: { search: newSearch } })
				.then(({ data: { searchAddress: addressesFound = [] } })=>{
					if (addressesFound.length) {
						const address = addressesFound[0];
						if (!address.street || !address.number || !address.city || !address.state) throw new Error('Não foi encontrado nenhum endereço');
						navigation.navigate('PickLocationScreen', { address })
					}
				})
				.catch((err) => {
					Alert.alert('Ops! Ocorreu um erro', getErrorMessage(err));
				})
				.finally(handleCloseModal)
		}
	}

	// ADDRESS
	function handleSelectAddress(address) {
		setErrorFormAsked(()=>askedInitialState);
		setSelectedAddress(address);
		if (!address.number || !address.street) {
			setAskFormOpen(true)
		} else
			navigation.navigate('PickLocationScreen', { address })
	}
	// rua joao quartieiro, 43, sombrio sc

	return (
		<ScrollView keyboardShouldPersistTaps='handled'>
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
					<Typography variant='h3' style={{ fontWeight: "bold", marginBottom: 8 }}>Faltaram alguns dados</Typography>
					<Typography variant='h5' style={{ marginBottom: 10 }}>Digite essas informações abaixo para localizarmos melhor seu endereço</Typography>
					{!!askFormOpen && !selectedAddress.street && <TextField
						label='Rua, avenida, etc'
						onChangeText={(text)=>setFormAsked((form)=>({ ...form, street: text }))}
						error={!!errorFormAsked.street}
						helperText={!!errorFormAsked.street && errorFormAsked.street}
						style={{ inputContainer: { backgroundColor: '#f0f0f0' } }}
					/>}
					<TextField
						label='Número'
						onChangeText={(text)=>setFormAsked((form)=>({ ...form, number: text }))}
						error={!!errorFormAsked.number}
						helperText={!!errorFormAsked.number && errorFormAsked.number}
						style={{ inputContainer: { backgroundColor: '#f0f0f0' } }}
					/>
					{loadingSearch
						? <View style={{ marginTop: 20 }}><LoadingBlock /></View>
						: (
							<>
								<Button icon={{ name: 'map-pin' }} label='Localizar' color='secondary' variant='filled' onPress={handleSearchWithNumber} />
								<Button label='cancelar' variant='outlined' onPress={handleCloseModal} />
							</>
						)}
				</Paper>
			</Modal>

			<Paper>
				<Typography variant='title' style={{ marginBottom: 20 }}>Busque sua localização</Typography>
				<TextField
					label='Ex.: Rua Alves Brito, 44, Criciuma SC'
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
					actionButtonOnPress={handleResetSearch}
				/>
				<Button
					label='Buscar'
					variant='filled'
					color='primary'
					icon='search'
					onPress={()=>handleSearch(addressSearch)}
				/>
			</Paper>
			{!!searchError && <FormHelperText error>{getErrorMessage(searchError)}</FormHelperText>}

			{loadingSearch
				? <ActivityIndicator color={palette.primary.main} size='large' />
				: addressesFound.length && addressSearch
					? (
						<>
							<Paper>
								<Typography variant='title'>Endereços encontrados</Typography>
								<Typography variant='subtitle' style={{ marginBottom: 20 }}>Selecione um dos endereços abaixo</Typography>
								<View>
									{addressesFound.map((addr, index) => <Address onPress={handleSelectAddress} divider={index < addressesFound.length -1} key={index} item={addr} />)}
								</View>
							</Paper>
							<View style={{ marginHorizontal: 35 }}>
								<Typography style={{ color: '#777', textAlign: 'center', marginVertical: 10 }}>Não encontrou o endereço que procurava?</Typography>
								<Button
									label='Encontrar no mapa'
									variant='outlined'
									//icon='map'
									onPress={()=>navigation.navigate('PickLocationScreen', { pickUserLocation: true })}
								/>
							</View>
						</>
					)
					: addressSearch
						? (
							<>
								<Paper variant='transparent' style={{ alignItems: 'center' }}>
									<Icon name='alert-circle' color={palette.background.dark} size={30} />
									<Typography variant='h4' style={{ textAlign: 'center', color: palette.background.dark }}>Nenhum endereço foi encontrado, tente digitar mais informações</Typography>
								</Paper>
								<View style={{ marginHorizontal: 35 }}>
									<Typography style={{ color: '#777', textAlign: 'center', marginVertical: 10 }}>...ou tente encontrar no mapa</Typography>
									<Button
										label='Encontrar no mapa'
										variant='outlined'
										//icon='map'
										onPress={()=>navigation.navigate('PickLocationScreen', { pickUserLocation: true })}
									/>
								</View>
							</>
						)
						: (
							<>
								<View style={{ alignItems: "center", marginHorizontal: 35 }}>
									<Icon name='chevron-up' color={palette.background.dark} size={30} />
									<Typography variant='h5' style={{ textAlign: 'center', color: palette.background.dark }}>Busque seu endereço acima</Typography>
								</View>
								<UserAddresses />
							</>
						)}
		</ScrollView>
	);
}
