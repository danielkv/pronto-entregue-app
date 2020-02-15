import { TextInputProps } from 'react-native';
import { TextFieldType } from "../theme/TextFieldTypes";

export interface TextFieldProps extends TextFieldType, Omit<TextInputProps, 'style'> {
	label: string
}