import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { merge, cloneDeep } from 'lodash';

import FormHelperText from '../FormHelperText';
import Icon from '../Icon';
import Typography from '../Typography';
import { useTheme } from '../utils';
import { ButtonProps } from './types';

function getIcon(icon) {
	if (typeof icon === 'string')
		return <Icon name={icon} />;

	if (icon.name)
		return <Icon name={icon.name} size={icon.size} type={icon.type} />;

	if (React.isValidElement(icon))
		return icon;

	return false;
}

export default function Button(props: ButtonProps) {
	const { Button, palette } = useTheme();
	const variant = props.variant || Button.variant;
	const colorVariant = props.color || Button.color;
	const IconComponent = props.icon ? getIcon(props.icon) : false;

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
				{Boolean(IconComponent) && IconComponent}
				{
					props.label
						? <Typography variant='button' style={styles.text}>{props.label}</Typography>
						: typeof props.children === 'string'
							? <Typography variant='button' style={styles.text}>{props.children}</Typography>
							: props.children
				}
			</TouchableOpacity>
			{Boolean(props.helperText)&& <FormHelperText>{props.helperText}</FormHelperText>}
		</View>
	)
}