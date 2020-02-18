import React from 'react';

import { TextField, Button } from '../../react-native-ui';
import { FormContainer, InputsContainer, ButtonsContainer } from './styles';

export default function UserForm({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	const refs = {};
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	return (
		<FormContainer>
			<InputsContainer>
				<TextField
					autoFocus
					label='Primeiro nome'
					autoCompleteType='name'
					onChangeText={handleChange('first_name')}
					onBlur={handleBlur('first_name')}
					disabled={isSubmitting}
					value={values.first_name}
					
					helperText={errors.first_name || ''}
					error={Boolean(errors.first_name)}
					inputRef={ref => { refs.first_name = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('last_name')}
				/>
				<TextField
					label='Sobrenome'
					onChangeText={handleChange('last_name')}
					onBlur={handleBlur('last_name')}
					disabled={isSubmitting}
					value={values.last_name}
					
					inputRef={ref => { refs.last_name = ref }}
					blurOnSubmit={false}
					helperText={errors.last_name || ''}
					error={Boolean(errors.last_name)}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('phone')}
				/>
				<TextField
					label='Telefone'
					autoCompleteType='tel'
					onChangeText={handleChange('phone')}
					onBlur={handleBlur('phone')}
					disabled={isSubmitting}
					value={values.phone}
					
					inputRef={ref => { refs.phone = ref }}
					helperText={errors.phone || ''}
					error={Boolean(errors.phone)}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('email')}
				/>
				<TextField
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
					onSubmitEditing={handleNextInput('repeat_password')}
				/>
				<TextField
					secureTextEntry
					label='confirmar senha'
					onChangeText={handleChange('repeat_password')}
					onBlur={handleBlur('repeat_password')}
					disabled={isSubmitting}
					value={values.repeat_password}
					
					inputRef={ref => { refs.repeat_password = ref }}
					helperText={errors.repeat_password || ''}
					error={Boolean(errors.repeat_password)}
					onSubmitEditing={handleSubmit}
				/>
			</InputsContainer>
			<ButtonsContainer>
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
