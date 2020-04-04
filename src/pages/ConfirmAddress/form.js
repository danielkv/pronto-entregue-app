import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { TextField, Typography, FormHelperText, useTheme, Button, Paper, Icon } from '../../react-native-ui';
import { InputsContainer, ButtonsContainer, FormContainer } from './styles';

export default function AddressForm({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) {
	const { palette } = useTheme();
	const refs = {};

	const [hasStreet] = useState(()=>Boolean(values.street));

	const handleNextInput = (fieldName) => () => {
		refs[fieldName].focus();
	}

	return (
		<>
			<Paper style={{ alignItems: "center" }}>
				{hasStreet && <Typography variant='h4' style={{ fontWeight: 'bold' }}>{`${values.street}${values.number ? `, ${values.number}` : ''}`}</Typography>}
				<Typography variant='h5'>{`${values.city}  - ${values.state}`}</Typography>
				<FormHelperText variant='outlined' color='primary' style={{  root: { marginTop: 10 } }}>Confirme o endereço</FormHelperText>
				<Icon name='chevron-down' />
			</Paper>
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
						onSubmitEditing={handleNextInput(hasStreet ? 'number' : 'street')}
					/>

					{!hasStreet && <TextField
						error={Boolean(errors.street)}
						helperText={errors.street}
						label='Rua'
						autoCompleteType='street-address'
						onChangeText={handleChange('name')}
						onBlur={handleBlur('name')}
						disabled={isSubmitting}
						value={values.street}

						inputRef={ref => { refs.street = ref }}
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={handleNextInput('number')}
					/>}
				
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
					>
						{isSubmitting
							? <ActivityIndicator color={palette.primary.main} />
							: 'Salvar e selecionar'}
					</Button>
				</ButtonsContainer>
			</FormContainer>
		</>
	);
}
