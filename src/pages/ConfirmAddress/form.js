import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { TextField, Typography, useTheme, Button, Paper, Icon } from '../../react-native-ui';
import { InputsContainer, ButtonsContainer, FormContainer } from './styles';

export default function AddressForm({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	const { palette } = useTheme();
	const refs = {};

	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	return (
		<>
			<View style={{ marginHorizontal: 35 }}>
				<Typography variant='title' style={{ textAlign: 'left' }}>Digite seu endereço abaixo</Typography>
				<Typography style={{ color: '#666', fontSize: 13 }}>Vamos tentar encontrar sua localização, caso não estiver correta, você pode corrigir na próxima etapa.</Typography>
			</View>
			<FormContainer>
				<InputsContainer>
					<TextField
						error={Boolean(errors.name)}
						helperText={errors.name}
						label='Ex.: Minha Casa, Sítio do avô, etc'
						onChangeText={handleChange('name')}
						onBlur={handleBlur('name')}
						disabled={isSubmitting}
						value={values.name}

						inputRef={ref => { refs.name = ref }}
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('street')}
					/>

					<TextField
						error={Boolean(errors.street)}
						helperText={errors.street}
						label='Rua'
						autoCompleteType='street-address'
						onChangeText={handleChange('street')}
						onBlur={handleBlur('street')}
						disabled={isSubmitting}
						value={values.street}

						inputRef={ref => { refs.street = ref }}
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('number')}
					/>
				
					<TextField
						error={Boolean(errors.number)}
						helperText={errors.number}
						label='Número'
						keyboardType='number-pad'
						onChangeText={handleChange('number')}
						onBlur={handleBlur('number')}
						disabled={isSubmitting}
						value={values.number}

						inputRef={ref => { refs.number = ref }}
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('complement')}
					/>
					<TextField
						error={Boolean(errors.complement)}
						helperText={errors.complement}
						label='Complemento'
						onChangeText={handleChange('complement')}
						onBlur={handleBlur('complement')}
						disabled={isSubmitting}
						value={values.complement}

						inputRef={ref => { refs.complement = ref }}
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('reference')}
					/>
					<TextField
						error={Boolean(errors.reference)}
						helperText={errors.reference}
						label='Ponto de referencia'
						onChangeText={handleChange('reference')}
						onBlur={handleBlur('reference')}
						disabled={isSubmitting}
						value={values.reference}

						inputRef={ref => { refs.reference = ref }}
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('district')}
					/>
					<TextField
						error={Boolean(errors.district)}
						helperText={errors.district}
						label='Bairro'
						onChangeText={handleChange('district')}
						onBlur={handleBlur('district')}
						disabled={isSubmitting}
						value={values.district}

						inputRef={ref => { refs.district = ref }}
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('zipcode')}
					/>
					<TextField
						error={Boolean(errors.zipcode)}
						helperText={errors.zipcode}
						keyboardType='number-pad'
						label='CEP'
						autoCompleteType='postal-code'
						onChangeText={handleChange('zipcode')}
						onBlur={handleBlur('zipcode')}
						disabled={isSubmitting}
						value={values.zipcode}

						inputRef={ref => { refs.zipcode = ref }}
						onSubmitEditing={handleSubmit}
					/>
				</InputsContainer>
				<ButtonsContainer>
					<Button
						variant='filled'
						color='primary'
						onPress={handleSubmit}
						disabled={isSubmitting}
						icon={!isSubmitting && 'chevron-right'}
					>
						{isSubmitting
							? <ActivityIndicator color={palette.primary.main} />
							: 'Próximo'}
					</Button>
				</ButtonsContainer>
			</FormContainer>
		</>
	);
}
