import React from 'react';
import { Linking } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

import * as Device from 'expo-device';

import { TextField, Button } from '../../react-native-ui';
import { FormContainer, InputsContainer, ButtonsContainer } from './styles';

const privacyUrl = 'https://prontoentregue.com.br/politica-privacidade';

export default function SeggestionForm({ privacyPolicy=false, values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	const refs = {};
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	const caretHidden = Device.brand === 'Xiaomi';

	return (
		<FormContainer>
			<InputsContainer>
				<TextField
					autoFocus
					label='Seu nome *'
					autoCompleteType='name'
					onChangeText={handleChange('name')}
					onBlur={handleBlur('name')}
					disabled={isSubmitting}
					value={values.name}
					
					helperText={errors.name || ''}
					error={Boolean(errors.name)}
					inputRef={ref => { refs.name = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('email')}
				/>
				<TextField
					caretHidden={caretHidden}
					label='Seu Email'
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
					onSubmitEditing={handleNextInput('companyName')}
				/>
				<TextField
					label='Nome do estabelecimento *'
					onChangeText={handleChange('companyName')}
					onBlur={handleBlur('companyName')}
					disabled={isSubmitting}
					value={values.companyName}
					
					inputRef={ref => { refs.companyName = ref }}
					blurOnSubmit={false}
					helperText={errors.companyName || ''}
					error={Boolean(errors.companyName)}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('companyContact')}
				/>
				<TextField
					label='Contato no estabelecimento'
					onChangeText={handleChange('companyContact')}
					onBlur={handleBlur('companyContact')}
					disabled={isSubmitting}
					value={values.companyContact}
					autoCompleteType='name'
					
					inputRef={ref => { refs.companyContact = ref }}
					blurOnSubmit={false}
					helperText={errors.companyContact || ''}
					error={Boolean(errors.companyContact)}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('companyPhone')}
				/>

				<TextInputMask
					label='Telefone de estabelecimento'
					autoCompleteType='tel'
					onChangeText={handleChange('companyPhone')}
					onBlur={handleBlur('companyPhone')}
					disabled={isSubmitting}
					value={values.companyPhone}
					
					inputRef={ref => { refs.companyPhone = ref }}
					helperText={errors.companyPhone || ''}
					error={Boolean(errors.companyPhone)}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('companyEmail')}

					type='cel-phone'
					options={{
						maskType: 'BRL',
						withDDD: true,
						dddMask: '(99) '
					}}
					customTextInput={TextField}
					
				/>
				<TextField
					caretHidden={caretHidden}
					label='Email do estabelecimento'
					keyboardType='email-address'
					autoCapitalize='none'
					autoCompleteType='email'
					onChangeText={handleChange('companyEmail')}
					onBlur={handleBlur('companyEmail')}
					disabled={isSubmitting}
					value={values.companyEmail}
					helperText={errors.companyEmail || ''}
					error={Boolean(errors.companyEmail)}

					inputRef={ref => { refs.companyEmail = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('message')}
				/>
				<TextField
					secureTextEntry
					label='Mensagem'
					multiline
					onChangeText={handleChange('message')}
					onBlur={handleBlur('message')}
					disabled={isSubmitting}
					value={values.message}

					style={{ inputContainer: { height: 150 } }}
					
					helperText={errors.message || ''}
					error={Boolean(errors.message)}
					inputRef={ref => { refs.message = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleSubmit}
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
					label='Enviar'
				/>
			</ButtonsContainer>
		</FormContainer>
	);
}
