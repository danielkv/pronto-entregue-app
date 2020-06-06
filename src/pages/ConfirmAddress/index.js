import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text'

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoadingBlock from '../../components/LoadingBlock';

import { sanitizeAddress } from '../../controller/address';
import { extractAddress } from '../../controller/address';
import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';
import { Container, ContainerScroll } from './styles';

import { SEARCH_ADDRESS, SEARCH_LOCATION } from '../../graphql/addresses';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Obrigatório'),
	street: Yup.string().required('Obrigatório'),
	number: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
	district: Yup.string().required('Obrigatório'),

	complement: Yup.string().notRequired(),
	reference: Yup.string().required('Obrigatório'),
	
	city: Yup.string().required('Obrigatório'),
	state: Yup.string().required('Obrigatório'),
	zipcode: Yup.mixed().required('Obrigatório').test('test_zipcode', 'CEP inválido', (value)=>MaskService.isValid('zip-code', value)),
});

export default function ConfirmAddress() {
	const navigation = useNavigation();
	const [loadingLocation, setLoadingLocation] = useState(true);
	const [address, setAddress] = useState(null)

	// setup search mutation
	const [searchAddress]= useMutation(SEARCH_ADDRESS, { fetchPolicy: 'no-cache' })
	const [searchLocation, { loading: loadingGeoLocation }] = useMutation(SEARCH_LOCATION)

	useEffect(()=>{
		setLoadingLocation(true);
		getLocationAsync()
			.then(async (location) => {
				const address = await geoLocate(location.coords);
				setAddress(extractAddress(address));
			})
			.catch((err) => {
				Alert.alert(
					'Tentamos buscar seu endereço, mas ocorreu um erro!',
					getErrorMessage(err),
					[
						{ text: 'Tentar novamente', onPress: ()=>getLocationAsync() },
						{ text: 'Digitar o endereço' },
					]
				);
			})
			.finally(()=>{
				setLoadingLocation(false)
			})
	}, [])

	function getLocationAsync() {

		return Location.getProviderStatusAsync()
			.then(({ locationServicesEnabled }) => {
				if (!locationServicesEnabled) throw new Error('Sua localização não está ativa')
			})
			.then(async ()=>{
				await getPermission();
			
				return Location.getCurrentPositionAsync({});
			})
			
			
	}

	async function getPermission() {
		const { status: statusGet } = await Permissions.getAsync(Permissions.LOCATION);

		if (statusGet !== 'granted') {
			const { status: statusASk } = await Permissions.askAsync(Permissions.LOCATION);
			if (statusASk !== 'granted') throw new Error('A permissão para acessar a localização foi negada')
		}
	}
	
	async function geoLocate(location) {
		const { data: { searchLocation: address } } = await searchLocation({ variables: { location: [location.latitude, location.longitude] } });

		return address;
	}

	function onSubmit (result) {
		const dataSave = sanitizeAddress(result);
		const search = `${dataSave.street}, ${dataSave.number}, ${dataSave.district}, ${dataSave.city}, ${dataSave.state}, ${dataSave.zipcode}`;

		return searchAddress({ variables: { search } })
			.then(({ data: { searchAddress } }) => {
				const address = dataSave;
				if (searchAddress?.[0]?.location) address.location = searchAddress?.[0]?.location;
					
				navigation.navigate('PickLocationScreen', { address })
			})
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro', getErrorMessage(err))
			})
	}

	if (loadingGeoLocation || loadingLocation) return <LoadingBlock message='Carregando sua localização' />

	// ------- END OF FUNCIONS -------

	const initialValues = {
		street: address?.street || '',
		number: address?.number || '',
		district: address?.district || '',
		zipcode: address?.zipcode ? MaskService.toMask('zip-code', address.zipcode)  : '',
		reference: address?.reference || '',
		
		name: address?.name || '',
		complement: address?.complement || '',
		city: address?.city || '',
		state: address?.state || '',
		location: address?.location || '',
		addressFound: Boolean(address?.street && address?.city && address?.state)
	}

	return (
		
		<ContainerScroll keyboardShouldPersistTaps='handled'>
			<Container>
				<Formik
					validationSchema={validationSchema}
					initialValues={initialValues}
					onSubmit={onSubmit}
					validateOnChange={false}
					validateOnBlur={false}
					component={PageForm}
				/>
			</Container>
		</ContainerScroll>
	);
}
