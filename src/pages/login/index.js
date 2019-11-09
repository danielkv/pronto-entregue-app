import React from 'react';
import { Alert } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import { Button, Input } from 'react-native-elements';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import logoResource from '../../assets/images/logo-copeiro.png';
import { Container, FormContainer, LogoImage, InputsContainer, ButtonsContainer } from './styles';
import { LOGIN } from '../../graphql/authentication';
import { logUserIn } from '../../services/init';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email válido')
		.required('Obrigatório'),
	password: Yup.string()
		.required('Obrigatório'),
});

export default function login({ navigation }) {
	const initialValues = {
		email: '',
		password: '',
	}

	const client = useApolloClient();

	const onSubmit = ({ email, password }, { setSubmitting, resetForm }) => {
		// navigation.navigate('SubscriptionScreen');
		client.mutate({ mutation: LOGIN, variables: { email, password } })
			.then(({ data })=>{
				resetForm();
				if (data.login.token) {
					logUserIn(data.login.token);
				}
			})
			.catch(err => {
				Alert.alert(err.message)
			}).finally(()=>{
				setSubmitting(false);
			});
	}

	// eslint-disable-next-line no-shadow
	const { values: { email, password }, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = useFormik({
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
						errorMessage={errors.email || ''}
						placeholder='Email'
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
						disabled={isSubmitting}
						value={email}
					/>
					<Input
						errorMessage={errors.password || ''}
						secureTextEntry
						placeholder='Senha'
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						disabled={isSubmitting}
						value={password}
					/>
				</InputsContainer>
				<ButtonsContainer>
					<Button
						onPress={handleSubmit}
						disabled={isSubmitting}
						loading={isSubmitting}
						title='Login'
					/>
					<Button
						buttonStyle={{ backgroundColor: '#B95A02' }}
						titleStyle={{ color: '#fff' }}
						onPress={() => navigation.navigate('SubscriptionScreen')}
						disabled={isSubmitting}
						title='Quero me cadastrar'
					/>
					<Button
						buttonStyle={{ backgroundColor: 'transparent' }}
						titleStyle={{ color: '#fff' }}
						disabled={isSubmitting}
						title='Esqueci minha senha'
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	);
}
