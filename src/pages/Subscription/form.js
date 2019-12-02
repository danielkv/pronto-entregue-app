import React from 'react';
import { Button, Input } from 'react-native-elements';

import { FormContainer, InputsContainer, ButtonsContainer } from './styles';

export default function UserForm({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	const refs = {};
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	return (
		<FormContainer>
			<InputsContainer>
				<Input
					errorMessage={errors.first_name || ''}
					autoFocus
					placeholder='Primeiro nome'
					autoCompleteType='name'
					onChangeText={handleChange('first_name')}
					onBlur={handleBlur('first_name')}
					disabled={isSubmitting}
					value={values.first_name}

					ref={ref => { refs.first_name = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('last_name')}
				/>
				<Input
					errorMessage={errors.last_name || ''}
					placeholder='Sobrenome'
					onChangeText={handleChange('last_name')}
					onBlur={handleBlur('last_name')}
					disabled={isSubmitting}
					value={values.last_name}

					ref={ref => { refs.last_name = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('phone')}
				/>
				<Input
					errorMessage={errors.phone || ''}
					placeholder='Telefone'
					autoCompleteType='tel'
					onChangeText={handleChange('phone')}
					onBlur={handleBlur('phone')}
					disabled={isSubmitting}
					value={values.phone}

					ref={ref => { refs.phone = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('email')}
				/>
				<Input
					errorMessage={errors.email || ''}
					placeholder='Email'
					keyboardType='email-address'
					autoCapitalize='none'
					autoCompleteType='email'
					onChangeText={handleChange('email')}
					onBlur={handleBlur('email')}
					disabled={isSubmitting}
					value={values.email}

					ref={ref => { refs.email = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('password')}
				/>
				<Input
					errorMessage={errors.password || ''}
					secureTextEntry
					placeholder='Senha'
					autoCompleteType='password'
					onChangeText={handleChange('password')}
					onBlur={handleBlur('password')}
					disabled={isSubmitting}
					value={values.password}

					ref={ref => { refs.password = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('repeat_password')}
				/>
				<Input
					errorMessage={errors.repeat_password || ''}
					secureTextEntry
					placeholder='confirmar senha'
					onChangeText={handleChange('repeat_password')}
					onBlur={handleBlur('repeat_password')}
					disabled={isSubmitting}
					value={values.repeat_password}

					ref={ref => { refs.repeat_password = ref }}
					onSubmitEditing={handleSubmit}
				/>
			</InputsContainer>
			<ButtonsContainer>
				<Button
					onPress={handleSubmit}
					disabled={isSubmitting}
					loading={isSubmitting}
					title='Salvar'
				/>
			</ButtonsContainer>
		</FormContainer>
	);
}
