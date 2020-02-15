import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Color } from '../theme/types';

export interface FormHelperTextType {
	variant?: "standard" | "outlined",
	color?: Color,
	style?: {
		standard?: FormHelperTextStyles,
		outlined?: FormHelperTextStyles,
		filled?: FormHelperTextStyles,
	},
}
export interface FormHelperTextStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface FormHelperTextProps extends FormHelperTextType {
	children: string,
	error?: boolean
}