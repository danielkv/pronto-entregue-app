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

function CityStateZipcode() {
	const cityRef = useRef(null);
	const stateRef = useRef(null);
	const zipcodeRef = useRef(null);
	const { values, errors, handleChange } = useFormikContext();

	useEffect(()=>{
		if (!cityRef.current) return;

		const time = setTimeout(focusField, 300);

		return ()=> clearTimeout(time);
	}, [])


	function focusField() {
		if (!cityRef.current.isFocused())
			cityRef.current.focus();
			
	}

	return (
		<FieldContainer bounces={false} keyboardDismissMode='none' keyboardShouldPersistTaps='never'>
			<FieldPanel onPress={focusField}>
				<>
					<FieldWrapper>
						<Field>
							<FieldLabel>Digite a cidade</FieldLabel>
							<FieldInput
								ref={cityRef}
								onChangeText={handleChange('city')}
								value={values.city}
								onSubmitEditing={()=>stateRef.current.focus()}
							/>
							{Boolean(errors.city) && <FormHelperText error>{errors.city}</FormHelperText>}
						</Field>
						<Field>
							<FieldLabel>Estado</FieldLabel>
							<FieldInput
								ref={stateRef}
								onChangeText={handleChange('state')}
								value={values.state}
								onSubmitEditing={()=>zipcodeRef.current.focus()}
							/>
							{Boolean(errors.state) && <FormHelperText error>{errors.state}</FormHelperText>}
						</Field>
						<Field>
							<FieldLabel>CEP</FieldLabel>
							<FieldInput
								ref={zipcodeRef}
								onChangeText={handleChange('zipcode')}
								value={values.zipcode}
							/>
							{Boolean(errors.zipcode) && <FormHelperText error>{errors.zipcode}</FormHelperText>}
						</Field>
					</FieldWrapper>

					<HelperWrapper>
						<FieldDescription>Para finalizar verifique a cidade, estado e CEP de onde quer receber seu pedido.</FieldDescription>
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

export default CityStateZipcode;