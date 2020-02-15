import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Color } from './types';

export interface TextFieldType {
	variant?: "standard" | "outlined" | "filled",
	color?: Color,
	style?: TextFieldStyles,
}
export interface TextFieldStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}
