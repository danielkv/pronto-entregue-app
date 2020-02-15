import React from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { useApolloClient } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import logoResource from '../../assets/images/logo-vertical-v2.png';
import { TextField } from '../../react-native-ui';
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
								
								ref={ref => { refs.password = ref }}
								onSubmitEditing={handleSubmit}
							/>
						</InputsContainer>
						<ButtonsContainer>
							<Button
								type='outline'
								onPress={handleSubmit}
								disabled={isSubmitting}
								loading={isSubmitting}
								title='Login'
								containerStyle={{ borderRadius: 25 }}
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
			</ContainerScroll>
		</KeyboardAvoidingView>
	);
}
