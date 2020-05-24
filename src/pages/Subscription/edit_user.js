import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text'
import Toast from 'react-native-tiny-toast';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { getErrorMessage } from '../../utils/errors';
import PageForm from './form';


import { LOGGED_USER_ID } from '../../graphql/authentication';
import { UPDATE_USER, GET_USER } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('Obrigatório'),
	lastName: Yup.string().required('Obrigatório'),
	phone: Yup.string().required('Obrigatório'),
	cpf: Yup.string().required('Obrigatório').test('test_cpf', 'CPF inválido', (value)=>MaskService.isValid('cpf', value)),
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
	password: Yup.string(),
	repeatPassword: Yup.string()
		.test('confirm_passaword', 'Não é igual a senha', function confirm(value) {
			return value === this.parent.password;
		}),
});

export default function EditUser({ userId }) {
	const navigation = useNavigation();
	const { params: { redirect = null } = {} } = useRoute();

	useEffect(()=>{
		navigation.setParams({
			headerTitle: 'Alterar meus dados'
		});
	}, [navigation]);
	
	const { data: { loggedUserId } } = useQuery(LOGGED_USER_ID);
	const { data: { user = null } = {}, loading: loadingUser, error: userError } = useQuery(GET_USER, { variables: { id: loggedUserId } });
	const [updateUser] = useMutation(UPDATE_USER, { variables: { id: userId } });
	
	const onSubmit = (result, { resetForm }) => {
		const saveData = {
			firstName: result.firstName,
			lastName: result.lastName,
			email: result.email,
			metas: [{
				id: user?.phones?.[0]?.id || null,
				action: user?.phones?.[0]?.id ? 'update' : 'create',
				key: 'phone',
				value: result.phone,
			}, {
				id: user?.cpf?.[0]?.id || null,
				action: user?.cpf?.[0]?.id ? 'update' : 'create',
				key: 'document',
				value: result.cpf,
			}]
		};

		// troca de senha
		if (result.password !== '') saveData.password = result.password;
		
		return updateUser({ variables: { data: saveData } })
			.then(() => {
				resetForm();

				Toast.show('Seus dados foram salvos');
				if (redirect)
					navigation.navigate(redirect);
				else
					navigation.navigate('ProfileScreen');
			})
			.catch(err => {
				Alert.alert(getErrorMessage(err));
			});
	}

	// ------- END OF FUNCIONS -------

	if (loadingUser) return <LoadingBlock />;
	if (userError) return <ErrorBlock error={userError} />;
		
	const initialValues = {
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user?.phones?.[0]?.value || '',
		cpf: user?.cpf?.[0]?.value || '',
		email: user.email,
		password: '',
		repeatPassword: '',
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			component={PageForm}
		/>
	);
}