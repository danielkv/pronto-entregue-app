import React from 'react';
import { Button, Input } from 'react-native-elements';

import { FormContainer, InputsContainer, ButtonsContainer } from './styles';

export default function UserForm({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	return (
		<FormContainer>
			<InputsContainer>
				<Input
					errorMessage={errors.first_name || ''}
					placeholder='Primeiro nome'
					onChangeText={handleChange('first_name')}
					onBlur={handleBlur('first_name')}
					disabled={isSubmitting}
					value={values.first_name}
				/>
				<Input
					errorMessage={errors.last_name || ''}
					placeholder='Sobrenome'
					onChangeText={handleChange('last_name')}
					onBlur={handleBlur('last_name')}
					disabled={isSubmitting}
					value={values.last_name}
				/>
				<Input
					errorMessage={errors.phone || ''}
					placeholder='Telefone'
					onChangeText={handleChange('phone')}
					onBlur={handleBlur('phone')}
					disabled={isSubmitting}
					value={values.phone}
				/>
				<Input
					errorMessage={errors.email || ''}
					placeholder='Email'
					onChangeText={handleChange('email')}
					onBlur={handleBlur('email')}
					disabled={isSubmitting}
					value={values.email}
				/>
				<Input
					errorMessage={errors.password || ''}
					secureTextEntry
					placeholder='Senha'
					onChangeText={handleChange('password')}
					onBlur={handleBlur('password')}
					disabled={isSubmitting}
					value={values.password}
				/>
				<Input
					errorMessage={errors.repeat_password || ''}
					secureTextEntry
					placeholder='confirmar senha'
					onChangeText={handleChange('repeat_password')}
					onBlur={handleBlur('repeat_password')}
					disabled={isSubmitting}
					value={values.repeat_password}
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
