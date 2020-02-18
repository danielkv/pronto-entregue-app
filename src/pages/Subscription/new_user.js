import React from 'react';
import { Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Typography } from '../../react-native-ui';
import { getErrors } from '../../utils/errors';
import PageForm from './form';

import { CREATE_USER } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('Obrigatório'),
	lastName: Yup.string().required('Obrigatório'),
	phone: Yup.number().required('Obrigatório'),
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
	password: Yup.string()
		.required('Obrigatório'),
	repeatPassword: Yup.string()
		.test('confirm_passaword', 'Não é igual a senha', function confirm(value) {
			return value === this.parent.password;
		}),
});

export default function NewUser() {
	const navigation = useNavigation();

	const initialValues = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
		repeatPassword: '',
	}

	const [createUser] = useMutation(CREATE_USER);

	const onSubmit = async (result, { resetForm }) => {
		const saveData = {
			firstName: result.firstName,
			lastName: result.lastName,
			password: result.password,
			email: result.email,
			metas: [{
				action: 'create',
				key: 'phone',
				value: result.phone,
			}]
		};
		
		await createUser({ variables: { data: saveData } })
			.then(() => {
				resetForm();
				Alert.alert(
					'Parabéns',
					'Sua conta foi criada',
					[{ text: 'Logar', onPress: () => navigation.navigate('LoginScreen') }],
					{ cancelable: false }
				);
			})
			.catch(err => {
				Alert.alert(getErrors(err));
			});
	}

	return (
		<>
			<Typography variant='h1' style={{ marginTop: 25 }}>Novo cadastro</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				validateOnBlur={false}
				onSubmit={onSubmit}
				component={PageForm}
			/>
			<Button
				variant='outlined'
				onPress={() => navigation.navigate('LoginScreen')}
				label='Já possuo uma conta'
			/>
		</>
	);
}