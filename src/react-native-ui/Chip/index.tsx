import React from 'react';
import { View, Text } from 'react-native';

import { merge, cloneDeep } from 'lodash';

import { useTheme } from '../utils';
import { ChipProps } from './types';

export default function Chip(props: ChipProps) {
	const { palette, Chip } = useTheme();
	const variant = props.variant || Chip.variant;
	const colorVariant = props.color || Chip.color;
	
	const componentStyle = merge({
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
		
	}, cloneDeep(Chip.style));

	const componentStandardStyle = componentStyle.default;
	const componentVariantStyle = componentStyle[variant];

	const styles = merge(componentStandardStyle, componentVariantStyle, props.style);

	return (
		<View style={styles.root}>
			<Text {...props} style={styles.text}>{props.label || props.children}</Text>
		</View>
	);
}
