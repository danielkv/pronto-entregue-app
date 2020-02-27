import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '../utils';
import { TypographyProps } from './types';

function Typography(props: TypographyProps) {
	const { palette, Typography } = useTheme();
	const variant = props.variant || Typography.variant;

	const styles = [{
		color: palette.text[variant]
	}, Typography.style.text, Typography.style[variant], props.style];

	return (
		<Text {...props} style={styles}>{props.children}</Text>
	);
}

export default React.memo(Typography);