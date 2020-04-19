import React from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-tiny-toast';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Formik } from 'formik';
import { isNumber } from 'lodash'
import * as Yup from 'yup';

import { sanitizeAddress } from '../../controller/address';
import { useLoggedUserId } from '../../controller/hooks';
import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';
import { Container, ContainerScroll } from './styles';

import { SET_SELECTED_ADDRESS } from '../../graphql/addresses';
import { CREATE_USER_ADDRESS, GET_USER_ADDRESSES } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Obrigatório'),
	street: Yup.string().required('Obrigatório'),
	number: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
	complement: Yup.string().notRequired(),
	district: Yup.string().required('Obrigatório'),
	zipcode: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
});

export default function ConfirmAddress() {
	const { params: { address = null } } = useRoute();
	const navigation = useNavigation();

	const loggedUserId = useLoggedUserId();
	const [createAddress] = useMutation(CREATE_USER_ADDRESS, { refetchQueries: [{ query: GET_USER_ADDRESSES, variables: { id: loggedUserId } }] });
	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);
	
	async function onSubmit(result) {
		const dataSave = sanitizeAddress(result);
		
		let createdResult;
		try {
			// if user is logged in, save the address in user account
			if (loggedUserId) createdResult = await createAddress({ variables: { data: dataSave } })

			// set selectedAddress
			const selectedAddress = createdResult?.data?.createUserAddress || dataSave;
			// save selected address
			await setSelectedAddress({ variables: { address: selectedAddress } })
				.then(() => {
					Toast.show('Endereço selecionado');

					navigation.dangerouslyGetParent().reset({
						index: 0,
						routes: loggedUserId
							? [{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } }]
							: [{ name: 'WelcomeRoutes', params: { screen: 'AskLoginScreen' } }]
					})
				})
		} catch (err) {
			Alert.alert(getErrorMessage(err));
		}
	}

	// ------- END OF FUNCIONS -------

	const initialValues = {
		street: address.street || '',
		number: isNumber(address.number) ? address.number.toString() : address.number,
		district: address.district || '',
		zipcode: isNumber(address.zipcode) ? address.zipcode.toString() : address.zipcode,
		
		name: address.name || '',
		complement: '',
		city: address.city,
		state: address.state,
		location: address.location
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
