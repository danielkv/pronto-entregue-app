import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';

import { Color, IconInComponentType } from '../theme/types';

export interface ButtonType {
	variant?: "standard" | "outlined" | "filled",
	color?: Color,
	style?: ButtonStyles
}

export interface ButtonStyles {
	standard?: ButtonVariantStyles,
	outlined?: ButtonVariantStyles,
	filled?: ButtonVariantStyles,
}

interface ButtonVariantStyles {
	root?: StyleProp<ViewStyle>,
	button?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface ButtonProps extends ButtonType, Omit<TouchableOpacityProps, 'style'> {
	label?: string
	children?: string | ReactNode,
	helperText?: string,
	icon?: IconInComponentType
}

