import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Color } from '../theme/types';

export interface FormHelperTextType {
	variant?: "default" | "outlined",
	color?: Color,
	style?: FormHelperTextStyles
}
export interface FormHelperTextStyles {
	default?: FormHelperTextVariantStyles,
	outlined?: FormHelperTextVariantStyles,
}

interface FormHelperTextVariantStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface FormHelperTextProps extends Omit<FormHelperTextType, 'style'> {
	children: string,
	error?: boolean,
	style?: FormHelperTextVariantStyles
}