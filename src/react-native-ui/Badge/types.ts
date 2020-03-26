import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TextProps } from 'react-native';

import { Color } from '../theme/types';

export interface BadgeType {
	color?: Color,
	style?: BadgeVariantStyles,
	showZero: Boolean,
	anchorOrigin: {
		horizontal: 'left' | 'right',
		vertical: 'top' | 'bottom'
	}
}

interface BadgeVariantStyles {
	root?: StyleProp<ViewStyle>,
	badge?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface BadgeProps extends Omit<BadgeType, 'style'>, Omit<TextProps, 'style'> {
	children: ReactNode,
	badgeContent: Number,
	style?: BadgeVariantStyles,
}