import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useMutation } from '@apollo/react-hooks';
import Toast from 'react-native-simple-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';

import PageForm from './form';
import { getErrors } from '../../utils/errors';
import { CREATE_USER_ADDRESS } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Obrigatório'),
	street: Yup.string().required('Obrigatório'),
	number: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
	complement: Yup.string().notRequired(),
	district: Yup.string().required('Obrigatório'),
	city: Yup.string().required('Obrigatório'),
	state: Yup.string().required('Obrigatório'),
	zipcode: Yup.number().typeError('Deve conter apenas números').required('Obrigatório'),
});

export default function NewAddress() {
	const navigation = useNavigation();

	const initialValues = {
		name: '',
		street: '',
		number: '',
		complement: '',
		district: '',
		city: '',
		state: '',
		zipcode: '',
	}

	const [createAddress] = useMutation(CREATE_USER_ADDRESS);

	const onSubmit = async (data, { resetForm }) => {
		const dataSave = {
			...data,
			zipcode: parseInt(data.zipcode, 10),
		}

		await createAddress({ variables: { data: dataSave } })
			.then(() => {
				resetForm();
				
				Toast.show('Endereço adicionado');
				navigation.navigate('AddressListScreen');
			})
			.catch(err => {
				Alert.alert(getErrors(err));
			});
	}

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={onSubmit}
			validateOnChange={false}
			validateOnBlur={false}
			component={PageForm}
		/>
	);
}
