import React from 'react';
import { Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';

import { useApolloClient } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import logoResource from '../../assets/images/logo-vertical-v2.png';
import { TextField, Button, Typography } from '../../react-native-ui';
import { logUserIn } from '../../services/init';
import { getErrorMessage } from '../../utils/errors';
import { Container, FormContainer, LogoImage, InputsContainer, ButtonsContainer, ContainerScroll } from './styles';

import { LOGIN } from '../../graphql/authentication';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
});

export default function ForgotPassword() {
	const navigation = useNavigation();
	
	const initialValues = {
		email: '',
	}

	const client = useApolloClient();

	const refs = {}
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	const onSubmit = async ({ email, password }, { resetForm }) => {
		await client.mutate({ mutation: LOGIN, variables: { email, password } })
			.then(({ data })=>{
				resetForm();
				if (data.login.token) {
					logUserIn(data.login.user, data.login.token);
				}
			})
			.catch(err => {
				Alert.alert(getErrorMessage(err));
			})
	}

	// eslint-disable-next-line no-shadow
	const { values: { email }, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = useFormik({
		initialValues,
		validationSchema,
		validateOnBlur: false,
		onSubmit,
	});

	return (
		<KeyboardAvoidingView style={{ margin: 0, flex: 1 }} behavior='height'>
			<ContainerScroll>
				<Container>
					<LogoImage source={logoResource} />
					<FormContainer>
						<InputsContainer>
							<Typography variant='h1' style={{ marginBottom: 10 }}>Recuperar senha</Typography>
							<TextField
								label='Email'
								//autoFocus
								keyboardType='email-address'
								autoCapitalize='none'
								autoCompleteType='email'
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								disabled={isSubmitting}
								value={email}

								error={Boolean(errors.email)}
								helperText={errors.email || ''}

								blurOnSubmit={false}
								returnKeyType='next'
								onSubmitEditing={handleNextInput('password')}
							/>
						</InputsContainer>
						<ButtonsContainer>
							<Button
								color='primary'
								variant='filled'
								type='outline'
								onPress={handleSubmit}
								disabled={isSubmitting}
								loading={isSubmitting}
								containerStyle={{ borderRadius: 25 }}
							>
								{isSubmitting
									? <ActivityIndicator />
									: 'Enviar'}
							</Button>
							<Button
								variant='outlined'
								onPress={() => navigation.navigate('LoginScreen')}
								disabled={isSubmitting}
								label='Já sei meu Login'
							/>
							
						</ButtonsContainer>
					</FormContainer>
				</Container>
			</ContainerScroll>
		</KeyboardAvoidingView>
	);
}
