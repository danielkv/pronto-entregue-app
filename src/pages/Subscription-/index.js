import React from 'react';
import { Alert } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import { Button, Input } from 'react-native-elements';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import logoResource from '../../assets/images/logo-copeiro.png';
import { Container, FormContainer, LogoImage, InputsContainer, ButtonsContainer } from './styles';
import { CREATE_USER } from '../../graphql/users';
import { getErrors } from '../../utils/errors';

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

export default function login({ navigation }) {
	const initialValues = {
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		password: '',
		repeat_password: '',
	}

	const client = useApolloClient();

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
		
		await client.mutate({ mutation: CREATE_USER, variables: { data: saveData } })
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

	// eslint-disable-next-line no-shadow
	const { values, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<Container>
			<LogoImage source={logoResource} />
			
			<FormContainer>
				<InputsContainer>
					<Input
						errorMessage={errors.first_name || ''}
						placeholder='Primeiro nome'
						onChangeText={handleChange('first_name')}
						onBlur={handleBlur('first_name')}
						disabled={isSubmitting}
						value={values.first_name}
					/>
					<Input
						errorMessage={errors.last_name || ''}
						placeholder='Sobrenome'
						onChangeText={handleChange('last_name')}
						onBlur={handleBlur('last_name')}
						disabled={isSubmitting}
						value={values.last_name}
					/>
					<Input
						errorMessage={errors.phone || ''}
						placeholder='Telefone'
						onChangeText={handleChange('phone')}
						onBlur={handleBlur('phone')}
						disabled={isSubmitting}
						value={values.phone}
					/>
					<Input
						errorMessage={errors.email || ''}
						placeholder='Email'
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
						disabled={isSubmitting}
						value={values.email}
					/>
					<Input
						errorMessage={errors.password || ''}
						secureTextEntry
						placeholder='Senha'
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						disabled={isSubmitting}
						value={values.password}
					/>
					<Input
						errorMessage={errors.repeat_password || ''}
						secureTextEntry
						placeholder='confirmar senha'
						onChangeText={handleChange('repeat_password')}
						onBlur={handleBlur('repeat_password')}
						disabled={isSubmitting}
						value={values.repeat_password}
					/>
				</InputsContainer>
				<ButtonsContainer>
					<Button
						onPress={handleSubmit}
						disabled={isSubmitting}
						loading={isSubmitting}
						title='Cadastrar'
					/>
					<Button
						buttonStyle={{ backgroundColor: '#B95A02' }}
						titleStyle={{ color: '#fff' }}
						onPress={() => navigation.navigate('LoginScreen')}
						disabled={isSubmitting}
						title='Já possuo uma conta'
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	);
}
