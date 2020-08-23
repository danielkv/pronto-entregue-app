import React from 'react';
import { Alert, ActivityIndicator, Platform } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import LoginIllustration from '../../assets/images/login-ill.png';
import logUserIn from '../../helpers/auth/logUserIn';
import { TextField, Button } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import FacebookButton from './FacebookButton';
import GoogleButtton from './GoogleButtton';
import { Container, BigHeader, FormContainer, InputsContainer, ButtonsContainer, BigHeaderImage, BigHeaderTitle } from './styles';

import { LOGIN } from '../../graphql/authentication';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
	password: Yup.string()
		.required('Obrigatório'),
});

const initialValues = {
	email: '',
	password: '',
}

export default function Login() {
	const { params: { redirect = null, redirectParams = {} } = {} } = useRoute();
	const navigation = useNavigation();
	
	// Setup GQL Mutation
	const [login] = useMutation(LOGIN);

	const refs = {}
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}
	
	const caretHidden = Device.brand === 'Xiaomi';

	function onSubmit({ email, password }, { resetForm }) {
		return login({ variables: { email, password } })
			.then(async ({ data })=>{
				resetForm();
				await logUserIn(data.login.user, data.login.token);
				afterLogin();
			})
			.catch(err => {
				Alert.alert(getErrorMessage(err));
			})
	}

	function afterLogin() {
		if (redirect)
			navigation.dangerouslyGetParent().replace(redirect, redirectParams);
		else
			navigation.dangerouslyGetParent().reset({
				index: 0,
				routes: [{ name: 'HomeRoutes', params: { screen: 'FeedScreen' } }]
			});
	}

	// eslint-disable-next-line no-shadow
	const { values: { email, password }, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = useFormik({
		initialValues,
		validationSchema,
		validateOnBlur: false,
		onSubmit,
	});

	return (
		<Container keyboardShouldPersistTaps='handled'>
			<BigHeader>
				<BigHeaderImage style={{ left: -40, marginTop: -35 }} source={LoginIllustration} />
				<BigHeaderTitle>Fazer login</BigHeaderTitle>
			</BigHeader>
			<FormContainer>
				<InputsContainer>
					<TextField
						caretHidden={caretHidden}
						label='Email'
						keyboardType='email-address'
						autoCapitalize='none'
						autoCompleteType='email'
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
						disabled={isSubmitting }
						value={email}

						error={Boolean(errors.email)}
						helperText={errors.email || ''}

						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('password')}
					/>
					<TextField
						secureTextEntry
						autoCompleteType='password'
						label='Senha'
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						disabled={isSubmitting}
						value={password}

						helperText={errors.password || ''}
						error={Boolean(errors.password)}
								
						inputRef={ref => { refs.password = ref }}
						onSubmitEditing={handleSubmit}
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
							: 'Entrar'}
					</Button>
					<Button
						variant='outlined'
						onPress={() => navigation.navigate('SubscriptionScreen')}
						disabled={isSubmitting}
						label='Quero me cadastrar'
					/>
					<Button
						disabled={isSubmitting}
						onPress={() => navigation.navigate('ForgotPasswordScreen')}
						label='Esqueci minha senha'
					/>
					{Platform.OS !== 'ios' && (
						<>
							<GoogleButtton afterLogin={afterLogin} disabled={isSubmitting} />
							<FacebookButton afterLogin={afterLogin} disabled={isSubmitting} />
						</>
					)}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	);
}
