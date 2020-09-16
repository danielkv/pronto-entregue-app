import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { merge, cloneDeep } from 'lodash';

import FormHelperText from '../FormHelperText';
import Typography from '../Typography';
import { useTheme } from '../utils';
import { getIcon } from '../utils/icons';
import { ButtonProps } from './types';

export default function Button(props: ButtonProps) {
	const { Button, palette } = useTheme();
	const variant = props.variant || Button.variant;
	const colorVariant = props.color || Button.color;
	const finalFullWidth = props.fullWidth ?? Button.fullWidth;

	const iconColor = variant === 'filled'
		? palette[colorVariant].contrastText
		: palette[colorVariant].main

	const IconComponent = props.icon ? getIcon(props.icon, iconColor) : false;

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

	const componentStandardStyle = componentStyle.default;
	const componentVariantStyle = componentStyle[variant];

	let styles = merge(
		componentStandardStyle,
		componentVariantStyle,
		{ root: { alignSelf: finalFullWidth ? 'stretch' : 'auto' }, button: { alignSelf: finalFullWidth ? 'stretch' : 'auto' } },
		props.disabled ? Button.style.disabled : {},
		props.style);

	return (
		<View style={styles.root}>
			<TouchableWithoutFeedback {...props}>
				<RectButton style={styles.button}>
					{Boolean(IconComponent) && IconComponent}
					{
						props.children
							? typeof props.children === 'string'
								? <Typography variant='button' style={styles.text}>{props.children}</Typography>
								: props.children
							: <Typography variant='button' style={styles.text}>{props.label}</Typography>
					}
				</RectButton>
			</TouchableWithoutFeedback>
			{Boolean(props.helperText) && <FormHelperText>{props.helperText}</FormHelperText>}
		</View>
	)
}