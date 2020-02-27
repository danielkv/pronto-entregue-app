import React from 'react';
import { View, Text } from 'react-native';

import { merge, cloneDeep } from 'lodash';

import { useTheme } from '../utils';
import { FormHelperTextProps } from './types';

function FormHelperText(props: FormHelperTextProps) {
	const { palette, FormHelperText } = useTheme();
	const variant = props.variant || FormHelperText.variant;
	const colorVariant = props.color || FormHelperText.color;

	const componentStyle = merge({
		default: {
			text: {
				color: palette[colorVariant].main
			}
		},
		outlined: {
			text: {
				color: palette[colorVariant].main
			},
			root: {
				borderColor: palette[colorVariant].main
			}
		},
		filled: {
			text: {
				color: palette[colorVariant].contrastText
			},
			root: {
				backgroundColor: palette[colorVariant].main
			}
		}
	}, cloneDeep(FormHelperText.style));

	const styles = merge(
		componentStyle.default,
		componentStyle[variant],
		props.error ? {
			root: variant === "outlined" ? { borderColor: palette.error.main } : {},
			text: { color: palette.error.main },
		} : {},
		props.style);

	console.log(colorVariant);

	return (

		<View style={styles.root}>
			<Text style={styles.text}>{props.children}</Text>
		</View>
	);
}

export default React.memo(FormHelperText);