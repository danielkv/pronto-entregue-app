import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../utils';
import { BadgeProps } from './types';

export default function Chip(props: BadgeProps) {
	const { palette, Badge } = useTheme();
	const colorVariant = props.color || Badge.color;

	const verticalAnchor = props?.anchorOrigin?.vertical || Badge.anchorOrigin.vertical;
	const horizontalAnchor = props?.anchorOrigin?.horizontal || Badge.anchorOrigin.horizontal;

	const top = verticalAnchor === 'top' ? 0 : 'auto';
	const bottom = verticalAnchor === 'bottom' ? 0 : 'auto';
	const left = horizontalAnchor === 'left' ? 0 : 'auto';
	const right = horizontalAnchor === 'right' ? 0 : 'auto';

	const rootStyles = [Badge.style.root, props?.style?.root];
	const badgeStyles = [Badge.style.badge, { backgroundColor: palette[colorVariant].main }, props?.style?.badge, { top, bottom, left, right }];
	const textStyles = [Badge.style.text, { color: palette[colorVariant].contrastText }, props?.style?.text];

	return (
		<View style={rootStyles}>
			{props.children}
			{Boolean((props.showZero && props.badgeContent === 0) || props.badgeContent) && <View style={badgeStyles}>
				<Text style={textStyles}>{props.badgeContent}</Text>
			</View>}
		</View>
	);
}
