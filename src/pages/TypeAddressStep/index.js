import React from 'react';
import { Alert, View } from 'react-native';
import { MaskService } from 'react-native-masked-text'

import { useMutation } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { sanitizeAddress } from '../../controller/address';
import { useLoggedUserId } from '../../controller/hooks';
import isValidAddress from '../../helpers/address/isValidAddress';
import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';

import { SET_SELECTED_ADDRESS, SET_USER_ADDRESS, SEARCH_ADDRESS } from '../../graphql/addresses';

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

export default function TypeAddressStep() {
	const { params: { address = null, redirect = { screen: 'FeedScreen' } } = {} } = useRoute();

	const navigation = useNavigation();
	const [searchAddress] = useMutation(SEARCH_ADDRESS);

	const loggedUserId = useLoggedUserId();

	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);
	const [createUserAddress] = useMutation(SET_USER_ADDRESS);

	function onSubmit (resultAddress) {
		// ready to save address
		if (loggedUserId && isValidAddress(resultAddress)) {
			const addressSave = sanitizeAddress(resultAddress);
			return createUserAddress({ variables: { userId: loggedUserId, addressData: addressSave } })
				.then(({ data: { setUserAddress } })=>{
					return setSelectedAddress({ variables: { address: setUserAddress } })
				})
				.then(()=>{
					navigation.reset({
						index: 0,
						routes: [{ name: redirect.screen, params: redirect.params }]
					})
				});
		}

		// not ready to sabe address
		return sendToMap(resultAddress);
	}

	function sendToMap(address) {
		const search = `${address.street}, ${address.number}, ${address.district}, ${address.city}, ${address.state}, ${address.zipcode}`;

		//return Location.geocodeAsync(search)
		return searchAddress({ variables: { search } })
			.then(({ data: { searchAddress = [] } }) => {
				
				if (searchAddress.length) address.location = searchAddress[0].location

				const addressToSend = sanitizeAddress(address)
				navigation.navigate('MapScreen', { address: addressToSend })
			})
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro', getErrorMessage(err))
			})
	}

	// ------- END OF FUNCIONS -------
	//console.log(MaskService.toMask('zip-code', '8860000'));
	const initialValues = {
		street: address?.street || '',
		number: address?.number ? String(address.number) : '',
		district: address?.district || '',
		zipcode: address?.zipcode ? MaskService.toMask('zip-code', String(address.zipcode)) : '',

		complement: '',
		reference: '',
		
		name: address?.name || '',
		city: address?.city || '',
		state: address?.state || '',
		location: address?.location || null
	};

	const initialErrors = {};
	
	Object.keys(validationSchema.fields).map(field => {
		try {
			const fieldSchema = validationSchema.fields[field];
			fieldSchema.validateSync(initialValues[field])
		} catch (err) {
			initialErrors[field] = err.message;
		}
	});

	return (
		<View style={{ flex: 1 }}>
			<Formik
				initialErrors={initialErrors}
				validationSchema={validationSchema}
				initialValues={initialValues}
				onSubmit={onSubmit}
				//validateOnChange={false}
				validateOnBlur={false}
			>
				{props => <PageForm {...props} redirect={redirect} />}
			</Formik>
		</View>
	);
}
