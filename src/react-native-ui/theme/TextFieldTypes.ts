import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Color } from './types';

export interface TextFieldType {
	variant?: "default" | "outlined" | "filled",
	color?: Color,
	style?: {
		default?: TextFieldStyles,
		outlined?: TextFieldStyles,
		filled?: TextFieldStyles,
	},
}
export interface TextFieldStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}
