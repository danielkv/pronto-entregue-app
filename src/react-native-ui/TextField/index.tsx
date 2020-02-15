import React from 'react';
import { View, TextInput } from 'react-native';

import FormHelperText from '../FormHelperText';
import { mergeStyles, useTheme } from '../utils';
import { TextFieldProps } from './types';

export default function TextField(props: TextFieldProps) {
	const { TextField } = useTheme();
	const variant = props.variant || TextField.variant;
	const styles = mergeStyles(TextField.style, variant, props.style);

	return (
		<View style={styles.root}>
			<View style={styles.inputContainer}>
				<TextInput ref={props.inputRef} placeholder={props.label} {...props} style={styles.text} />
			</View>
			{Boolean(props.helperText)&& <FormHelperText error={props.error}>{props.helperText}</FormHelperText>}
		</View>
	)
}