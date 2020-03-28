import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../utils';
import { ChipProps } from './types';

export default function Chip(props: ChipProps) {
	const { palette, Chip } = useTheme();
	const variant = props.variant || Chip.variant;
	const colorVariant = props.color || Chip.color;
	
	const addStyle = {
		default: {
			text: {
				color: palette[colorVariant].contrastText
			},
			root: {
				backgroundColor: palette[colorVariant].main
			}
		},
		outlined: {
			text: {
				color: palette[colorVariant].main
			},
			root: {
				borderColor: palette[colorVariant].main,
				backgroundColor: 'transparent'
			}
		},
		
	}

	const componentStandardStyle = Chip.style.default;
	const componentVariantStyle = Chip.style[variant];

	const rootStyle = [componentStandardStyle.root, addStyle[variant]?.root, componentVariantStyle.root, props?.style?.root];
	const textStyle = [componentStandardStyle.text, addStyle[variant]?.text, componentVariantStyle.text, componentVariantStyle.text, props?.style?.text];

	return (
		<View style={rootStyle}>
			<Text {...props} style={textStyle}>{props.label || props.children}</Text>
		</View>
	);
}
