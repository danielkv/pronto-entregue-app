import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Color } from '../theme/types';

export interface FormHelperTextType {
	variant?: "standard" | "outlined",
	color?: Color,
	style?: FormHelperTextStyles
}
export interface FormHelperTextStyles {
	standard?: FormHelperTextVariantStyles,
	outlined?: FormHelperTextVariantStyles,
}

interface FormHelperTextVariantStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface FormHelperTextProps extends FormHelperTextType {
	children: string,
	error?: boolean
}