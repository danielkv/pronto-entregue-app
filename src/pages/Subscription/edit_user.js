import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Formik } from 'formik';
import Toast from 'react-native-simple-toast';
import * as Yup from 'yup';

import PageForm from './form';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';
import { getErrors } from '../../utils/errors';

import { UPDATE_USER, GET_USER } from '../../graphql/users';

const validationSchema = Yup.object().shape({
	first_name: Yup.string().required('Obrigatório'),
	last_name: Yup.string().required('Obrigatório'),
	phone: Yup.number().required('Obrigatório'),
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
	password: Yup.string(),
	repeat_password: Yup.string()
		.test('confirm_passaword', 'Não é igual a senha', function confirm(value) {
			return value === this.parent.password;
		}),
});

export default function EditUser({ user_id }) {
	const navigation = useNavigation();

	useEffect(()=>{
		navigation.setParams({
			headerTitle: 'Alterar meus dados'
		});
	}, [navigation]);
	
	const { data: userData, loading: loadingUser, error: userError } = useQuery(GET_USER);
	const [updateUser] = useMutation(UPDATE_USER, { variables: { id: user_id } });
	
	const onSubmit = async (result, { resetForm }) => {
		const saveData = {
			first_name: result.first_name,
			last_name: result.last_name,
			email: result.email,
			metas: [{
				action: 'update',
				meta_type: 'phone',
				meta_value: result.phone,
			}]
		};

		// troca de senha
		if (result.password !== '') saveData.password = result.password;
		
		await updateUser({ variables: { data: saveData } })
			.then(() => {
				resetForm();

				Toast.show('Seus dados foram salvos');
				navigation.navigate('ProfileScreen');
			})
			.catch(err => {
				Alert.alert(getErrors(err));
			});
	}

	// ------- END OF FUNCIONS -------

	if (loadingUser) return <LoadingBlock />;
	if (userError) return <ErrorBlock error={userError} />;
		
	const initialValues = {
		first_name: userData.me.first_name,
		last_name: userData.me.last_name,
		phone: userData.me.metas[0].meta_value,
		email: userData.me.email,
		password: '',
		repeat_password: '',
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