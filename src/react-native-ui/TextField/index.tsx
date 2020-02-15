import React from 'react';
import { View, TextInput } from 'react-native';

import FormHelperText from '../FormHelperText';
import { mergeStyles, useTheme } from '../utils';
import { TextFieldProps } from './types';

export default function TextField(props: TextFieldProps) {
	const { TextField } = useTheme();
	const variant = props.variant || TextField.variant;
	const styles = mergeStyles(TextField, variant, props.style);

	return (
		<View>
			<View style={styles.root}>
				<TextInput placeholder={props.label} {...props} style={styles.text} />
			</View>
			{Boolean(props.helperText)&& <FormHelperText error={props.error}>{props.helperText}</FormHelperText>}
		</View>
	)
}