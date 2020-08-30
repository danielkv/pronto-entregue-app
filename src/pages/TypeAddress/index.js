import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { MaskService } from 'react-native-masked-text'
import Animated from 'react-native-reanimated';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';
import * as Location from 'expo-location';
import { Formik } from 'formik';
import * as Yup from 'yup';

import BigHeader from '../../components/BigHeader';

import MapIllustration from '../../assets/images/map-ill.png';
import { sanitizeAddress } from '../../controller/address';
import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';

import { SET_SELECTED_ADDRESS } from '../../graphql/addresses';

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
	const { params: { address = null, redirect = { screen: 'HomeRoutes', params: { screen: 'FeedScreen' } } } = {} } = useRoute();

	const navigation = useNavigation();
	const scrollY = new Animated.Value(0);

	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);

	useEffect(()=>{
		if (!address) return;

		Alert.alert(
			'Verifique o endereço',
			'A partir da localização informada, encontramos esse endereço. Confira todos os dados para que não haja problemas na entrega.'
		)
	}, [])

	function onSubmit (resultAddress) {
		if (address)
			return setAddress(resultAddress);
		
		return sendToMap(resultAddress);
	}

	function sendToMap(address) {
		const search = `${address.street}, ${address.number}, ${address.district}, ${address.city}, ${address.state}, ${address.zipcode}`;

		return Location.geocodeAsync(search)
			.then(([addressFound]) => {

				const addressToSend = sanitizeAddress({ ...address, ...addressFound, zipcode: addressFound.postalcode })
				
				return navigation.navigate('MapScreen', { address: addressToSend })
			})
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro', getErrorMessage(err))
			})
	}

	function setAddress(address) {
		return setSelectedAddress({ variables: { address } })
			.then(()=>{
				navigation.dangerouslyGetParent().reset({
					index: 0,
					routes: [{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } }]
				})
			});
	}

	// ------- END OF FUNCIONS -------
	//console.log(MaskService.toMask('zip-code', '8860000'));
	const initialValues = __DEV__ && !address ? {
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
		street: address.street || '',
		number: String(address.number) || '',
		district: address.district || '',
		zipcode: address.zipcode ? MaskService.toMask('zip-code', String(address.zipcode)) : '',

		complement: '',
		reference: '',
		
		name: '',
		city: address.city || '',
		state: address.state || ''
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
				<Formik
					validationSchema={validationSchema}
					initialValues={initialValues}
					onSubmit={onSubmit}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{(props)=><PageForm {...props} redirect={redirect} />}
				</Formik>
			</Animated.ScrollView>

			<BigHeader
				title={address ? 'Confirme\no endereço' : 'Digite o\nendereço'}
				image={MapIllustration}
				imageStyle={{ left: -60, width: '100%', transform: [{ rotate: '-15deg' }] }}
				scrollY={scrollY}
			/>
		</View>
	);
}
