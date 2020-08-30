import React from 'react';

import { useFocusEffect } from '@react-navigation/core';
import { useFormikContext } from 'formik';

import { FormHelperText, Button, Icon } from '../../../react-native-ui';
import {
	FieldContainer,
	FieldPanel,
	FieldLabel,
	FieldInput,
	FieldHelper,
	FieldDescription,
	FieldWrapper,
	HelperWrapper,
	FieldFooter,
	Field
} from './styles'

function AddressField({ labels, fields, helperText, description, navigation, routes, currentRoute }) {
	const refs = {};
	const { values, errors, handleChange, validateForm } = useFormikContext();

	useFocusEffect(()=>{
		focusFirstField(false)
	})

	function validate () {
		const init = new Date();
		return validateForm()
			.then(validationErros => {
				const finishes = new Date();
				console.log(finishes.getTime() - init.getTime())
				return fields.some(f => Boolean(validationErros[f]));
			})
	}

	function goToNext() {
		validate()
			.then(error =>{
				if (error) return;

				navigation.navigate(routes[currentRoute+1]);
			})
	}

	function focusFirstField(force=true) {
		const firstField = fields.find((field) => {
			const fieldRef = refs[field];

			if (!fieldRef?.props) return false;

			return !fieldRef.props.value
		})

		const firstFieldRef = firstField ? refs[firstField] : force ? refs[fields[0]] : null;
		
		if (firstFieldRef?.focus) {
			if (!firstFieldRef.isFocused())
				firstFieldRef.focus();
		}
	}

	function isLastField(fieldIndex) {
		return fieldIndex >= fields.length -1
	}

	function isLastScreen(routes, currentIndex) {
		return currentIndex >= routes.length -1
	}

	const nextField = (fieldIndex) => () => {
		if (isLastField(fieldIndex))
			goToNext()
		else {
			const nextField = fields[fieldIndex+1]
			const nextFieldRef = refs[nextField];

			if (nextFieldRef?.focus)
				nextFieldRef.focus();
		}
	}

	return (
		<FieldContainer bounces={false} keyboardDismissMode='none' keyboardShouldPersistTaps='never'>
			<FieldPanel onPress={()=>focusFirstField(true)}>
				<Icon name='edit-2' style={{ root: { position: 'absolute', right: 20, top: 20 } }} />
				<FieldWrapper>
					{fields.map((field, index)=>
						<Field key={index}>
							<FieldLabel>{labels[index]}</FieldLabel>
							<FieldInput
								ref={ref => { refs[field]= ref; }}
								onChangeText={handleChange(field)}
								onSubmitEditing={nextField(index)}
								blurOnSubmit={isLastScreen(routes, currentRoute) && isLastField(index) ? true : false}
								value={values[field]}
							/>
							{Boolean(errors[field]) && <FormHelperText error>{errors[field]}</FormHelperText>}
						</Field>
					)}
				</FieldWrapper>

				<HelperWrapper>
					{Boolean(helperText) && <FieldHelper>{helperText}</FieldHelper>}
					{Boolean(description) && <FieldDescription>{description}</FieldDescription>}
				</HelperWrapper>
			</FieldPanel>
			<FieldFooter>
				<Button
					style={{ root: { flex: 1 }, text: { fontSize: 14 } }}
					icon='chevron-right'
					onPress={goToNext}
					variant='filled'
					color='primary'
				>
					Próximo
				</Button>
			</FieldFooter>
		</FieldContainer>);
}

export default AddressField;