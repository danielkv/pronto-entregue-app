import React from 'react';
import { Alert, KeyboardAvoidingView, ActivityIndicator, Image, } from 'react-native';

import { useApolloClient } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import imageFB from '../../assets/images/logo-fb.png';
import imageGoogle from '../../assets/images/logo-google.png';
import logoResource from '../../assets/images/logo-vertical-v2.png';
import { TextField, Button, Typography } from '../../react-native-ui';
import { logUserIn } from '../../services/init';
import { getErrors } from '../../utils/errors';
import { Container, FormContainer, LogoImage, InputsContainer, ButtonsContainer, ContainerScroll } from './styles';

import { LOGIN } from '../../graphql/authentication';



const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email inválido')
		.required('Obrigatório'),
	password: Yup.string()
		.required('Obrigatório'),
});

export default function Login({ navigation }) {
	const initialValues = {
		email: '',
		password: '',
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
				Alert.alert(getErrors(err));
			})
	}

	// eslint-disable-next-line no-shadow
	const { values: { email, password }, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<KeyboardAvoidingView style={{ margin: 0, flex: 1 }} behavior='height'>
			<ContainerScroll>
				<Container>
					<LogoImage source={logoResource} />
					<FormContainer>
						<InputsContainer>
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
							<TextField
								secureTextEntry
								autoCompleteType='password'
								placeholder='Senha'
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
								label='Esqueci minha senha'
							/>
							<Button
								variant='filled'
								disabled={isSubmitting}
							>
								<>
									<Image source={imageGoogle} />
									<Typography variant='button' style={{ color: '#fff' }}>Logar com Google</Typography>
								</>
							</Button>
							<Button
								variant='filled'
								disabled={isSubmitting}
							>
								<>
									<Image source={imageFB} style={{ marginRight: 10 }} />
									<Typography variant='button' style={{ color: '#fff' }}>Logar com Facebook</Typography>
								</>
							</Button>
						</ButtonsContainer>
					</FormContainer>
				</Container>
			</ContainerScroll>
		</KeyboardAvoidingView>
	);
}
