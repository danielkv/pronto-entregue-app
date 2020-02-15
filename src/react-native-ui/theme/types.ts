import { ButtonType } from '../Button/types';
import { FormHelperTextType } from '../FormHelperText/types';
import { TextFieldType } from '../TextField/types';

export interface Theme {
	palette?: {
		primary?: ColorVararits;
		secondary?: ColorVararits;
		default?: ColorVararits;
		divider?: string;
		gray?: string;
		text?: string;
		error?: ColorVararits
	};
	TextField?: TextFieldType,
	FormHelperText?: FormHelperTextType,
	Button?: ButtonType,
}

interface ColorVararits {
	light: string
	main: string
	dark: string
	contrastText: string
}

export type Color = 'primary' | 'secondary' | 'default';