import React from 'react';
import { Linking } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

import * as Device from 'expo-device';

import { TextField, Button, Typography, useTheme } from '../../react-native-ui';
import { FormContainer, InputsContainer, ButtonsContainer } from './styles';

const privacyUrl = 'https://prontoentregue.com.br/politica-privacidade';

export default function UserForm({ privacyPolicy=false, values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	const { palette } = useTheme()
	const refs = {};
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	const caretHidden = Device.brand === 'Xiaomi';

	return (
		<FormContainer>
			<InputsContainer>
				<Typography style={{ textAlign: 'right', color: palette.background.dark, marginBottom: 10 }}>Dados de acesso</Typography>
				<TextField
					caretHidden={caretHidden}
					label='Email'
					keyboardType='email-address'
					autoCapitalize='none'
					autoCompleteType='email'
					onChangeText={handleChange('email')}
					onBlur={handleBlur('email')}
					disabled={isSubmitting}
					value={values.email}
					helperText={errors.email || ''}
					error={Boolean(errors.email)}

					inputRef={ref => { refs.email = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('password')}
				/>
				<TextField
					secureTextEntry
					label='Senha'
					autoCompleteType='password'
					onChangeText={handleChange('password')}
					onBlur={handleBlur('password')}
					disabled={isSubmitting}
					value={values.password}
					
					helperText={errors.password || ''}
					error={Boolean(errors.password)}
					inputRef={ref => { refs.password = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('repeatPassword')}
				/>
				<TextField
					secureTextEntry
					label='confirmar senha'
					onChangeText={handleChange('repeatPassword')}
					onBlur={handleBlur('repeatPassword')}
					disabled={isSubmitting}
					value={values.repeatPassword}
					
					inputRef={ref => { refs.repeatPassword = ref }}
					helperText={errors.repeatPassword || ''}
					error={Boolean(errors.repeatPassword)}
					onSubmitEditing={handleNextInput('firstName')}
				/>

				<Typography style={{ textAlign: 'right', color: palette.background.dark, marginTop: 20 }}>Dados pessoais</Typography>
				<Typography style={{ textAlign: 'right', color: palette.background.dark, marginBottom: 10, fontSize: 12 }}>Esses dados serão usadosg para agilizar a entrega</Typography>
				<TextField
					label='Primeiro nome'
					autoCompleteType='name'
					onChangeText={handleChange('firstName')}
					onBlur={handleBlur('firstName')}
					disabled={isSubmitting}
					value={values.firstName}
					
					helperText={errors.firstName || ''}
					error={Boolean(errors.firstName)}
					inputRef={ref => { refs.firstName = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('lastName')}
				/>
				<TextField
					label='Sobrenome'
					onChangeText={handleChange('lastName')}
					onBlur={handleBlur('lastName')}
					disabled={isSubmitting}
					value={values.lastName}
					
					inputRef={ref => { refs.lastName = ref }}
					blurOnSubmit={false}
					helperText={errors.lastName || ''}
					error={Boolean(errors.lastName)}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('cpf')}
				/>

				<TextInputMask
					label='CPF'
					onChangeText={handleChange('cpf')}
					onBlur={handleBlur('cpf')}
					disabled={isSubmitting}
					value={values.cpf}
					
					customTextInputProps={{
						inputRef: ref => { refs.cpf = ref },
						helperText: errors.cpf || '',
						error: Boolean(errors.cpf),
						blurOnSubmit: false,
						returnKeyType: 'next',
						onSubmitEditing: handleNextInput('phone'),
					}}

					type='cpf'
					customTextInput={TextField}
				/>

				<TextInputMask
					label='Telefone'
					autoCompleteType='tel'
					onChangeText={handleChange('phone')}
					onBlur={handleBlur('phone')}
					disabled={isSubmitting}
					value={values.phone}

					customTextInputProps={{
						inputRef: ref => { refs.phone = ref },
						helperText: errors.phone || '',
						error: Boolean(errors.phone),
						blurOnSubmit: false,
						returnKeyType: 'next',
						onSubmitEditing: handleSubmit,
					}}
					
					type='cel-phone'
					options={{
						maskType: 'BRL',
						withDDD: true,
						dddMask: '(99) '
					}}
					customTextInput={TextField}
					
				/>
				
				
			</InputsContainer>
			<ButtonsContainer>
				{privacyPolicy && <Button
					color='primary'
					style={{ root: { marginBottom: 10 }, button: { height: 30 }, text: { fontSize: 13, textTransform: 'none' } }}
					onPress={()=>{ Linking.canOpenURL(privacyUrl).then(()=>Linking.openURL(privacyUrl)) }}
					disabled={isSubmitting}
					label='Leia nossa Política de Privacidade'
				/>}
				<Button
					color='primary'
					variant='filled'
					onPress={handleSubmit}
					disabled={isSubmitting}
					label='Salvar'
				/>
			</ButtonsContainer>
		</FormContainer>
	);
}
