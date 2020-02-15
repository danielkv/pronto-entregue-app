import { TextInputProps } from 'react-native';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Color } from '../theme/types';

export interface TextFieldType {
	variant?: "standard" | "outlined" | "filled",
	color?: Color,
	style?: {
		standard?: TextFieldStyles,
		outlined?: TextFieldStyles,
		filled?: TextFieldStyles,
	},
}
export interface TextFieldStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface TextFieldProps extends TextFieldType, Omit<TextInputProps, 'style'> {
	label: string,
	error: boolean,
	helperText: string,
}