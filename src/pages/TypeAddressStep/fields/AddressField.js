import React, { useCallback, useState } from 'react';
import { InteractionManager, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/core';
import { useFormikContext } from 'formik';

import { FormHelperText, Icon, IconButton } from '../../../react-native-ui';
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

function AddressField({ labels, inputs, fields, helperText, description, navigation, routes, currentRoute }) {
	const refs = {};
	const { values, errors, handleChange } = useFormikContext();
	const [block, setBlock] = useState(false);

	useFocusEffect(useCallback(() => {
		const task = InteractionManager.runAfterInteractions(() => {
			focusFirstField(false)
		});

		return () => task.cancel();
	}, []))

	function validate() {
		return fields.some(f => Boolean(errors[f]));
	}

	function goToNext() {
		if (block) return;
		if (validate()) return;

		setBlock(true);
		navigation.navigate(routes[currentRoute + 1])

		return setTimeout(() => setBlock(false), 1000);
	}

	function focusFirstField(force = true) {
		const firstField = fields.find((field) => {
			const fieldRef = refs[field];

			if (!fieldRef?.props) return false;

			return !fieldRef.props.value
		})

		const firstFieldRef = firstField ? refs[firstField] : force ? refs[fields[0]] : null;

		if (firstFieldRef?.focus) {
			if (!firstFieldRef.isFocused())
				firstFieldRef.focus();
			else
				firstFieldRef.blur();
		}
	}

	function isLastField(fieldIndex) {
		return fieldIndex >= fields.length - 1
	}

	function isLastScreen(routes, currentIndex) {
		return currentIndex >= routes.length - 1
	}

	const nextField = (fieldIndex) => () => {
		if (isLastField(fieldIndex))
			goToNext()
		else {
			const nextField = fields[fieldIndex + 1]
			const nextFieldRef = refs[nextField];

			if (nextFieldRef?.focus)
				nextFieldRef.focus();
		}
	}

	function returnField(field, index) {
		const props = {
			ref: ref => { refs[field] = ref; },
			onChangeText: handleChange(field),
			onSubmitEditing: nextField(index),
			blurOnSubmit: isLastScreen(routes, currentRoute) && isLastField(index) ? true : false,
			value: values[field]
		}

		const fn = inputs?.[field];

		if (fn && typeof fn === 'function')
			return fn(props)
		else
			return <FieldInput {...props} />
	}

	return (
		<View>
			<FieldContainer bounces={false} keyboardDismissMode='none' keyboardShouldPersistTaps='never'>
				<FieldPanel onPress={() => focusFirstField(true)}>
					<Icon name='edit-2' style={{ root: { position: 'absolute', right: 20, top: 20 } }} />
					<FieldWrapper>
						{fields.map((field, index) =>
							<Field key={index}>
								<FieldLabel>{labels[index]}</FieldLabel>
								{returnField(field, index)}
								{Boolean(errors[field]) && <FormHelperText error>{errors[field]}</FormHelperText>}
							</Field>
						)}
					</FieldWrapper>

					<HelperWrapper>
						{Boolean(helperText) && <FieldHelper>{helperText}</FieldHelper>}
						{Boolean(description) && <FieldDescription>{description}</FieldDescription>}
					</HelperWrapper>
				</FieldPanel>
			</FieldContainer>
			<FieldFooter>
				<IconButton icon={{ name: 'chevron-right', size: 30 }} style={{
					button: { height: 60, width: 60 }, root: {
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 5,
						},
						shadowOpacity: 0.34,
						shadowRadius: 6.27,

						elevation: 10
					}
				}} color='primary' variant='filled' onPress={goToNext} />
			</FieldFooter>
		</View>
	);
}

export default AddressField;