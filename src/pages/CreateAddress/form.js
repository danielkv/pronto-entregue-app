import React from 'react';
import { Button, Input } from 'react-native-elements';

import { InputsContainer, ButtonsContainer, FormContainer } from './styles';

export default function AddressForm({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	const refs = {};
	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	return (
		<FormContainer>
			<InputsContainer>
				<Input
					autoFocus
					errorMessage={errors.name}
					placeholder='Nome de identificação'
					onChangeText={handleChange('name')}
					onBlur={handleBlur('name')}
					disabled={isSubmitting}
					value={values.name}

					ref={ref => { refs.name = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('street')}
				/>
				<Input
					errorMessage={errors.street}
					placeholder='Rua'
					autoCompleteType='street-address'
					onChangeText={handleChange('street')}
					onBlur={handleBlur('street')}
					disabled={isSubmitting}
					value={values.street}

					ref={ref => { refs.street = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('number')}
				/>
				<Input
					errorMessage={errors.number}
					placeholder='Número'
					keyboardType='number-pad'
					onChangeText={handleChange('number')}
					onBlur={handleBlur('number')}
					disabled={isSubmitting}
					value={values.number}

					ref={ref => { refs.number = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('complement')}
				/>
				<Input
					errorMessage={errors.complement}
					placeholder='Complemento'
					onChangeText={handleChange('complement')}
					onBlur={handleBlur('complement')}
					disabled={isSubmitting}
					value={values.complement}

					ref={ref => { refs.complement = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('district')}
				/>
				<Input
					errorMessage={errors.district}
					placeholder='Bairro'
					onChangeText={handleChange('district')}
					onBlur={handleBlur('district')}
					disabled={isSubmitting}
					value={values.district}

					ref={ref => { refs.district = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('city')}
				/>
				<Input
					errorMessage={errors.city}
					placeholder='Cidade'
					onChangeText={handleChange('city')}
					onBlur={handleBlur('city')}
					disabled={isSubmitting}
					value={values.city}

					ref={ref => { refs.city = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('state')}
				/>
				<Input
					errorMessage={errors.state}
					placeholder='Estado'
					onChangeText={handleChange('state')}
					onBlur={handleBlur('state')}
					disabled={isSubmitting}
					value={values.state}

					ref={ref => { refs.state = ref }}
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={handleNextInput('zipcode')}
				/>
				<Input
					errorMessage={errors.zipcode}
					keyboardType='number-pad'
					placeholder='CEP'
					autoCompleteType='postal-code'
					onChangeText={handleChange('zipcode')}
					onBlur={handleBlur('zipcode')}
					disabled={isSubmitting}
					value={values.zipcode}

					ref={ref => { refs.zipcode = ref }}
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
