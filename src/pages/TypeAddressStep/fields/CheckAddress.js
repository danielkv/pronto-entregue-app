import React, { useRef, useEffect } from 'react';
import { Text } from 'react-native';

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

function CheckAddress() {
	const fieldRef = useRef(null);
	const { values, errors, handleChange } = useFormikContext();

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
						<FieldLabel>Dê um <Text style={{ fontFamily: 'Roboto-Bold' }}>nome</Text> para seu endereço</FieldLabel>
						<FieldInput
							ref={fieldRef}
							onChangeText={handleChange('street')}
							value={values.street}
						/>
						{Boolean(errors.street) && <FormHelperText error>{errors.street}</FormHelperText>}
					</FieldWrapper>

					<HelperWrapper>
						<FieldHelper>asd</FieldHelper>
						<FieldDescription>aasd</FieldDescription>
				
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

export default CheckAddress;