import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TouchableOpacityProps, TouchableWithoutFeedbackProps } from 'react-native';

import { Color, IconInComponentType } from '../theme/types';

export interface ButtonType {
	variant?: "default" | "outlined" | "filled",
	color?: Color,
	style?: ButtonStyles,
	fullWidth?: Boolean
}

export interface ButtonStyles {
	default?: ButtonVariantStyles,
	outlined?: ButtonVariantStyles,
	filled?: ButtonVariantStyles,
	disabled?: ButtonVariantStyles,
}

interface ButtonVariantStyles {
	root?: StyleProp<ViewStyle>,
	button?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface ButtonProps extends Omit<ButtonType, 'style'>, Omit<TouchableWithoutFeedbackProps, 'style'> {
	label?: string
	disabled?: boolean
	children?: string | ReactNode
	helperText?: string,
	icon?: IconInComponentType
	style?: ButtonVariantStyles
}

