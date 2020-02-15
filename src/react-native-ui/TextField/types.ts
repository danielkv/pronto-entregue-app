import { Ref } from 'react';
import { TextInputProps, TextInput } from 'react-native';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface TextFieldType {
	variant?: "standard" | "outlined" | "filled",
	style?: TextFieldStyles,
}

export interface TextFieldStyles {
	standard?: TextFieldVariantStyles,
	outlined?: TextFieldVariantStyles,
	filled?: TextFieldVariantStyles,
}

interface TextFieldVariantStyles {
	root?: StyleProp<ViewStyle>,
	inputContainer?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface TextFieldProps extends TextFieldType, Omit<TextInputProps, 'style'> {
	label: string,
	error: boolean,
	helperText: string,
	inputRef: Ref<TextInput>
}