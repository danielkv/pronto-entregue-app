import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';

import { Color, IconInComponentType } from '../theme/types';

export interface IconButtonType {
	variant?: "default" | "outlined" | "filled",
	color?: Color,
	style?: IconButtonStyles
}

export interface IconButtonStyles {
	default?: IconButtonVariantStyles,
	outlined?: IconButtonVariantStyles,
	filled?: IconButtonVariantStyles,
}

interface IconButtonVariantStyles {
	root?: StyleProp<ViewStyle>,
	button?: StyleProp<ViewStyle>,
}

export interface IconButtonProps extends Omit<IconButtonType, 'style'>, Omit<TouchableOpacityProps, 'style'> {
	children?: ReactNode,
	icon?: IconInComponentType
	style?: IconButtonVariantStyles
}

