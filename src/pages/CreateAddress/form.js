import React from 'react';
import { Button, Input } from 'react-native-elements';

import { InputsContainer, ButtonsContainer, FormContainer } from './styles';

export default function AddressForm({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	return (
		<FormContainer>
			<InputsContainer>
				<Input
					errorMessage={errors.name}
					placeholder='Nome de identificação'
					onChangeText={handleChange('name')}
					onBlur={handleBlur('name')}
					disabled={isSubmitting}
					value={values.name}
				/>
				<Input
					errorMessage={errors.street}
					placeholder='Rua'
					onChangeText={handleChange('street')}
					onBlur={handleBlur('street')}
					disabled={isSubmitting}
					value={values.street}
				/>
				<Input
					errorMessage={errors.number}
					placeholder='Número'
					keyboardType='number-pad'
					onChangeText={handleChange('number')}
					onBlur={handleBlur('number')}
					disabled={isSubmitting}
					value={values.number}
				/>
				<Input
					errorMessage={errors.district}
					placeholder='Bairro'
					onChangeText={handleChange('district')}
					onBlur={handleBlur('district')}
					disabled={isSubmitting}
					value={values.district}
				/>
				<Input
					errorMessage={errors.city}
					placeholder='Cidade'
					onChangeText={handleChange('city')}
					onBlur={handleBlur('city')}
					disabled={isSubmitting}
					value={values.city}
				/>
				<Input
					errorMessage={errors.state}
					placeholder='Estado'
					onChangeText={handleChange('state')}
					onBlur={handleBlur('state')}
					disabled={isSubmitting}
					value={values.state}
				/>
				<Input
					errorMessage={errors.zipcode}
					keyboardType='number-pad'
					placeholder='CEP'
					onChangeText={handleChange('zipcode')}
					onBlur={handleBlur('zipcode')}
					disabled={isSubmitting}
					value={values.zipcode}
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
