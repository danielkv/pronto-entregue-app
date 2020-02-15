import { FormHelperTextType } from '../FormHelperText/types';
import { TextFieldType } from '../TextField/types';

export interface Theme {
	colors?: {
		primary?: string;
		secondary?: string;
		divider?: string;
		gray?: string;
		text?: string;
		error?: {
			light: string
			main: string
			dark: string
			contrastText: string
		};
	};
	TextField?: TextFieldType,
	FormHelperText?: FormHelperTextType,
}

export enum Color {
	primary='primary',
	secondary='secondary'
}