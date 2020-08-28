/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useEffect } from 'react';

import { useFormikContext } from 'formik';

import { FormHelperText } from '../../../react-native-ui';
import {
	FieldContainer,
	FieldPanel,
	FieldLabel,
	Field,
	FieldInput,
	FieldDescription,
	FieldButton,
	FieldWrapper,
	HelperWrapper,
	FieldFooter
} from './styles'

function StreetNumberField() {
	const streetRef = useRef(null);
	const numberRef = useRef(null);
	const { values, errors, handleChange } = useFormikContext();

	useEffect(()=>{
		if (!streetRef.current) return;

		const time = setTimeout(focusField, 300);

		return ()=> clearTimeout(time);
	}, [])


	function focusField() {
		if (!streetRef.current.isFocused())
			streetRef.current.focus();
			
	}

	return (
		<FieldContainer bounces={false} keyboardDismissMode='none' keyboardShouldPersistTaps='never'>
			<FieldPanel onPress={focusField}>
				<>
					<FieldWrapper>
						<Field>
							<FieldLabel>Digite o nome da rua/avenida</FieldLabel>
							<FieldInput
								ref={streetRef}
								onChangeText={handleChange('street')}
								value={values.street}
								onSubmitEditing={()=>numberRef.current.focus()}
							/>
							{Boolean(errors.street) && <FormHelperText error>{errors.street}</FormHelperText>}
						</Field>
						<Field>
							<FieldLabel>E o número</FieldLabel>
							<FieldInput
								ref={numberRef}
								onChangeText={handleChange('number')}
								value={values.number}
								onSubmitEditing={()=>{}}
							/>
							{Boolean(errors.number) && <FormHelperText error>{errors.number}</FormHelperText>}
						</Field>
				
					</FieldWrapper>

					<HelperWrapper>
						
						<FieldDescription>Caso sua casa não tenha número, preencha com '0'.</FieldDescription>
				
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

export default StreetNumberField;