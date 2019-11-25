import React from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';

import PageForm from './form';
import { getErrors } from '../../utils/errors';

import { CREATE_USER } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	first_name: Yup.string().required('Obrigatório'),
	last_name: Yup.string().required('Obrigatório'),
	phone: Yup.number().required('Obrigatório'),
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
	password: Yup.string()
		.required('Obrigatório'),
	repeat_password: Yup.string()
		.test('confirm_passaword', 'Não é igual a senha', function confirm(value) {
			return value === this.parent.password;
		}),
});

export default function NewUser() {
	const navigation = useNavigation();

	const initialValues = {
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		password: '',
		repeat_password: '',
	}

	const [createUser] = useMutation(CREATE_USER);

	const onSubmit = async (result, { resetForm }) => {
		const saveData = {
			first_name: result.first_name,
			last_name: result.last_name,
			password: result.password,
			email: result.email,
			metas: [{
				action: 'create',
				meta_type: 'phone',
				meta_value: result.phone,
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
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				component={PageForm}
			/>
			<Button
				buttonStyle={{ backgroundColor: '#B95A02' }}
				titleStyle={{ color: '#fff' }}
				onPress={() => navigation.navigate('LoginScreen')}
				title='Já possuo uma conta'
			/>
		</>
	);
}