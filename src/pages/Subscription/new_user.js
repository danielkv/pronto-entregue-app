import React from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Typography } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';

import { CREATE_USER } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('Obrigatório'),
	lastName: Yup.string().required('Obrigatório'),
	phone: Yup.string().notRequired(),
	cpf: Yup.string().notRequired().test('test_cpf', 'CPF inválido', (value)=>value ? MaskService.isValid('cpf', value) : true),
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
		cpf: '',
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
			metas: [
				{
					action: 'create',
					key: 'phone',
					value: result.phone,
				},
				{
					action: 'create',
					key: 'document',
					value: result.cpf,
				}
			]
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
				Alert.alert(getErrorMessage(err));
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
				component={(props)=><PageForm privacyPolicy={true} {...props} />}
			/>
			<Button
				variant='outlined'
				onPress={() => navigation.navigate('LoginScreen')}
				label='Já possuo uma conta'
			/>
		</>
	);
}