import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import logoResource from '../../assets/images/logo-vertical-v2.png';
import { TextField, Button, Typography } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import { Container, FormContainer, LogoImage, InputsContainer, ButtonsContainer, ContainerScroll } from './styles';

import { RECOVER_PASSWORD } from '../../graphql/authentication';

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

	const [recoverPassword] = useMutation(RECOVER_PASSWORD);

	const refs = {}
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	const onSubmit = async ({ email  }) => {
		return recoverPassword({ variables: { email } })
			.then(()=>{
				Alert.alert(
					'Verifique sua caixa de entrada',
					'Enviamos um email com instruções para você recuperar sua senha',
					[{ text: 'OK', onPress: ()=>navigation.navigate('LoginScreen') }]);
			})
			.catch(err => {
				Alert.alert('Ops! Algo deu errado', getErrorMessage(err));
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
	);
}
