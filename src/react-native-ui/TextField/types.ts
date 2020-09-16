import { Ref, ReactNode } from 'react';
import { TextInputProps, TextInput } from 'react-native';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface TextFieldType {
	variant?: "default" | "outlined" | "filled",
	style?: TextFieldStyles,
}

export interface TextFieldStyles {
	default?: TextFieldVariantStyles,
	outlined?: TextFieldVariantStyles,
	filled?: TextFieldVariantStyles,
}

interface TextFieldVariantStyles {
	root?: StyleProp<ViewStyle>,
	label?: StyleProp<ViewStyle>
	inputContainer?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface TextFieldProps extends Omit<TextFieldType, 'style'>, Omit<TextInputProps, 'style'> {
	label: string,
	error: boolean,
	disabled: boolean,
	helperText: string,
	inputRef: Ref<TextInput>,
	style?: TextFieldVariantStyles,
	actionButton?: ReactNode,
	actionButtonOnPress?(text: string): void
}