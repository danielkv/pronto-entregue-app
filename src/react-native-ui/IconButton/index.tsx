import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { merge, cloneDeep } from 'lodash';

import { useTheme } from '../utils';
import { getIcon } from '../utils/icons'
import { IconButtonProps } from './types';


export default function IconButton(props: IconButtonProps) {
	const { IconButton, palette } = useTheme();

	const variant = props.variant || IconButton.variant;
	const colorVariant = props.color || IconButton.color;
	
	const iconColor = variant === 'filled'
		? palette[colorVariant].contrastText
		: palette[colorVariant].main

	const IconComponent = props.icon ? getIcon(props.icon, iconColor) : props.children;

	const componentStyle = merge({
		default: {
		},
		outlined: {
			button: {
				borderColor: palette[colorVariant].main
			}
		},
		filled: {
			button: {
				backgroundColor: palette[colorVariant].main
			}
		}
	}, cloneDeep(IconButton.style));

	const componentStandardStyle = componentStyle.default;
	const componentVariantStyle = componentStyle[variant];

	const styles = merge(componentStandardStyle, componentVariantStyle, props.style);

	return (
		<View style={styles.root}>
			<TouchableOpacity {...props} style={styles.button}>
				{Boolean(IconComponent) && IconComponent}
			</TouchableOpacity>
		</View>
	)
}