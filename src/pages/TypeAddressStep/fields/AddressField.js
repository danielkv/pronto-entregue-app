import React, { useRef, useEffect } from 'react';

import { useFormikContext } from 'formik';

import { FormHelperText } from '../../../react-native-ui';
import {
	FieldContainer,
	FieldPanel,
	FieldLabel,
	FieldInput,
	FieldHelper,
	FieldDescription,
	FieldButton,
	FieldWrapper,
	HelperWrapper,
	FieldFooter
} from './styles'

function AddressField({ label, fieldName, helperText, description }) {
	const fieldRef = useRef(null);
	const { values, errors, handleChange } = useFormikContext();

	const fieldValue = values[fieldName];
	const fieldError = errors[fieldName];

	useEffect(()=>{
		if (!fieldRef.current) return;

		const time = setTimeout(focusField, 300);

		return ()=> clearTimeout(time);
	}, [])


	function focusField() {
		if (!fieldRef.current.isFocused())
			fieldRef.current.focus();
			
	}

	return (
		<FieldContainer bounces={false} keyboardDismissMode='none' keyboardShouldPersistTaps='never'>
			<FieldPanel onPress={focusField}>
				<>
					<FieldWrapper>
						<FieldLabel>{label}</FieldLabel>
						<FieldInput
							ref={fieldRef}
							onChangeText={handleChange(fieldName)}
							value={fieldValue}
						/>
						{Boolean(fieldError) && <FormHelperText error>{fieldError}</FormHelperText>}
					</FieldWrapper>

					<HelperWrapper>
						{Boolean(helperText) && <FieldHelper>{helperText}</FieldHelper>}
						{Boolean(description) && <FieldDescription>{description}</FieldDescription>}
					</HelperWrapper>
				</>
			</FieldPanel>

			<FieldFooter>
				<FieldButton
					variant='filled'
					color='primary'
				>
					Próximo
				</FieldButton>
			</FieldFooter>
		</FieldContainer>);
}

export default AddressField;