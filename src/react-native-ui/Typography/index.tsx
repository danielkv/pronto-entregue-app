import React from 'react';
import { Text } from 'react-native';

import { merge } from 'lodash';

import { useTheme } from '../utils';
import { TypographyProps } from './types';

export default function Typography(props: TypographyProps) {
	const { palette, Typography } = useTheme();
	const variant = props.variant || Typography.variant;

	const styles = merge({
		color: palette.text
	}, Typography.style[variant], props.style);

	console.log(variant, Typography.style[variant])

	return (
		<Text {...props} style={styles}>{props.children}</Text>
	);
}
