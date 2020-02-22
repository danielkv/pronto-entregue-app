import React from 'react';
import { Alert, KeyboardAvoidingView, ActivityIndicator, Image, } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
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

const initialValues = {
	email: '',
	password: '',
}

export default function Login() {
	const navigation = useNavigation();

	// Setup GQL Mutation
	const [login] = useMutation(LOGIN);

	const refs = {}
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	function onSubmit({ email, password }, { resetForm }) {
		return login({ variables: { email, password } })
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
							<Typography variant='h1' style={{ marginBottom: 10 }}>Faça o Login!</Typography>
							<TextField
								label='Email'
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
