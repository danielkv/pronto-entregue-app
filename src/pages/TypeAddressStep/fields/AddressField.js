import React, { useEffect } from 'react';

import { useFocusEffect } from '@react-navigation/core';
import { useFormikContext } from 'formik';

import { FormHelperText, Button } from '../../../react-native-ui';
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
		focusFirstField()
	}, [])
	

	useEffect(()=>{
		const unsubscribe = navigation.addListener('blur', async () => {
			validate()
				.then(error =>{
					if (error) navigation.goBack();
				})
		});

		return unsubscribe;
	}, [navigation])

	function validate () {
		return validateForm()
			.then(validationErros => {
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

	function goToPrevious() {
		if (currentRoute <= 0) return;

		const screen = routes[currentRoute-1];
		navigation.navigate(screen);
	}

	function focusFirstField() {
		const firstField = fields.find((field) => {
			const fieldRef = refs[field];

			if (!fieldRef?.props) return false;

			return !fieldRef.props.value
		})

		const firstFieldRef = firstField ? refs[firstField] : refs[fields[0]];
		
		if (firstFieldRef?.focus)
			firstFieldRef.focus();
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
			<FieldPanel onPress={focusFirstField}>
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
				{currentRoute > 0 &&<Button
					style={{ root: { flex: .35, marginRight: 7 }, text: { fontSize: 14 } }}
					icon='chevron-left'
					onPress={goToPrevious}
					variant='filled'
					color='default'
				>
					Voltar
				</Button>}
				<Button
					style={{ root: { flex: .65 }, text: { fontSize: 14 } }}
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