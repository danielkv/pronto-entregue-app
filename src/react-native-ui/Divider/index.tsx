import React from 'react';
import { View } from 'react-native';

import { useTheme } from '../utils';
import { DividerProps } from './types';

export default function Divider(props: DividerProps) {
	const { palette, Divider } = useTheme();
	const variant = props.variant || Divider.variant;

	const styles = [{
		borderColor: palette.divider
	}, Divider.style.default, Divider.style[variant], props.style];

	return (
		<View {...props} style={styles} />
	);
}
