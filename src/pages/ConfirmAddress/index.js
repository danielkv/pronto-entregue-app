import React from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import Toast from 'react-native-tiny-toast';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Formik } from 'formik';
import { isNumber } from 'lodash'
import * as Yup from 'yup';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { sanitizeAddress } from '../../controller/address';
import { getErrors } from '../../utils/errors';
import PageForm from './form';
import { Container, ContainerScroll } from './styles';

import { SET_SELECTED_ADDRESS } from '../../graphql/addresses';
import { CREATE_USER_ADDRESS, GET_USER_ADDRESSES } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Obrigatório'),
	number: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
	complement: Yup.string().notRequired(),
	district: Yup.string().required('Obrigatório'),
	zipcode: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
});

export default function ConfirmAddress() {
	const { params: { address = null } } = useRoute();
	// const navigation = useNavigation();

	const [createAddress] = useMutation(CREATE_USER_ADDRESS, { refetchQueries: [{ query: GET_USER_ADDRESSES }] });
	const [setSelectedAddress] = useMutation(SET_SELECTED_ADDRESS);
	
	const onSubmit = async (result) => {
		const dataSave = sanitizeAddress(result);
		
		return createAddress({ variables: { data: dataSave } })
			.then(() => {
				setSelectedAddress({ variables: { address: dataSave } })

				Toast.show('Endereço selecionado');
			})
			.catch(err => {
				Alert.alert(getErrors(err));
			});
	}

	// ------- END OF FUNCIONS -------

	const initialValues = {
		street: address.street,
		number: isNumber(address.number) ? address.number.toString() : address.number,
		district: address.district || '',
		zipcode: isNumber(address.zipcode) ? address.zipcode.toString() : address.zipcode,
		
		name: '',
		complement: '',
		city: address.city,
		state: address.state,
		location: address.location
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
			<ContainerScroll>
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
		</KeyboardAvoidingView>
	);
}
