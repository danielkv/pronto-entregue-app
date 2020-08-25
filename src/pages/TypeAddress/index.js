import React from 'react';
import { Alert, View } from 'react-native';
import { MaskService } from 'react-native-masked-text'
import Animated from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import { Formik } from 'formik';
import * as Yup from 'yup';

import BigHeader from '../../components/BigHeader';

import MapIllustration from '../../assets/images/map-ill.png';
import { sanitizeAddress } from '../../controller/address';
import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';
import { Container } from './styles';

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

export default function TypeAddress() {
	const navigation = useNavigation();
	const scrollY = new Animated.Value(0);

	/* useEffect(()=>{
		setLoadingLocation(true);
		getLocation()
			.then(async (foundLocation) => {
				const coords = foundLocation.coords
				setLocation(coords)

				//const { data: { searchLocation: addressFound } } = await apolloClient.mutate({ mutation: SEARCH_LOCATION, variables: { location: [coords.latitude, coords.longitude] } });
				const addressFound = await Location.reverseGeocodeAsync(coords)
				setAddress(addressFound)

				return addressFound;
			})
			.catch((err) => {
				Alert.alert(
					'Tentamos buscar seu endereço, mas ocorreu um erro!',
					getErrorMessage(err),
					[
						{ text: 'Tentar novamente', onPress: ()=>getLocation() },
						{ text: 'Digitar o endereço' },
					]
				);
			})
			.finally(()=>{
				setLoadingLocation(false)
			})
	}, []) */

	
	function onSubmit (result) {
		const dataSave = sanitizeAddress(result);
		const search = `${dataSave.street}, ${dataSave.number}, ${dataSave.district}, ${dataSave.city}, ${dataSave.state}, ${dataSave.zipcode}`;

		/* return searchAddress({ variables: { search } }) */
		return Location.geocodeAsync(search)
			.then((res) => {
				console.log(res);
				/* const address = dataSave;
				if (searchAddress?.[0]?.location) address.location = searchAddress?.[0]?.location; */
					
				//navigation.navigate('PickLocationScreen', { address })
			})
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro', getErrorMessage(err))
			})
	}

	// ------- END OF FUNCIONS -------

	const initialValues = __DEV__ ? {
		street: 'Rua João Quartieiro',
		number: '43',
		district: 'Centro',
		zipcode: '88960-000',
		complement: 'casa',
		reference: 'Ritmi',
		
		name: 'Casa',
		city: 'Sombrio',
		state: 'SC'
	} : {
		street: '',
		number: '',
		district: '',
		zipcode: '',
		reference: '',
		
		name: '',
		city: '',
		state: ''
	};

	return (
		<View style={{ flex: 1 }}>
			<Animated.ScrollView
				scrollEventThrottle={16}
				style={{ flex: 1 }}
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingBottom: 50, paddingTop: 220 }}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
			>
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
			</Animated.ScrollView>

			<BigHeader
				title={'Digite o\nendereço'}
				image={MapIllustration}
				imageStyle={{ left: -60, width: '100%', transform: [{ rotate: '-15deg' }] }}
				scrollY={scrollY}
			/>
		</View>
	);
}
