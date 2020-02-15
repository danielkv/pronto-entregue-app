import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { merge, cloneDeep } from 'lodash';

import FormHelperText from '../FormHelperText';
import { useTheme } from '../utils';
import { ButtonProps } from './types';

export default function Button(props: ButtonProps) {
	const { Button, palette } = useTheme();
	const variant = props.variant || Button.variant;
	const colorVariant = props.color || Button.color;

	const componentStyle = merge({
		standard: {
			text: {
				color: palette[colorVariant].main
			}
		},
		outlined: {
			text: {
				color: palette[colorVariant].main
			},
			button: {
				borderColor: palette[colorVariant].main
			}
		},
		filled: {
			text: {
				color: palette[colorVariant].contrastText
			},
			button: {
				backgroundColor: palette[colorVariant].main
			}
		}
	}, cloneDeep(Button.style));

	const componentStandardStyle = componentStyle.standard;
	const componentVariantStyle = componentStyle[variant];

	const styles = merge(componentStandardStyle, componentVariantStyle, props.style);


	return (
		<View style={styles.root}>
			<TouchableOpacity {...props} style={styles.button}>
				{
					props.label
						? <Text style={styles.text}>{props.label}</Text>
						: typeof props.children === 'string' ? <Text style={styles.text}>{props.children}</Text> : props.children
				}
			</TouchableOpacity>
			{Boolean(props.helperText)&& <FormHelperText>{props.helperText}</FormHelperText>}
		</View>
	)
}