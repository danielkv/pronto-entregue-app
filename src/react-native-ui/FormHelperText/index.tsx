import React from 'react';
import { View, Text } from 'react-native';

import { merge } from 'lodash';

import { mergeStyles, useTheme } from '../utils';
import { FormHelperTextProps } from './types';

export default function FormHelperText(props: FormHelperTextProps) {
	const { colors, FormHelperText } = useTheme();
	const variant = props.variant || FormHelperText.variant;
	let styles = mergeStyles(FormHelperText, variant, props.style);

	if (props.error) {
		styles = merge(styles, {
			root: variant === "outlined" ? { borderColor: colors.error.main } : {},
			text: { color: colors.error.main },
		})
	}

	return (

		<View style={styles.root}>
			<Text style={styles.text}>{props.children}</Text>
		</View>
	);
}
