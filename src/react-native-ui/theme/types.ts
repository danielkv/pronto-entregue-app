import { ReactNode } from 'react';

import { ButtonType } from '../Button/types';
import { ChipType } from '../Chip/types';
import { FormHelperTextType } from '../FormHelperText/types';
import { IconType, IconProps } from '../Icon/types';
import { TextFieldType } from '../TextField/types';
import { TypographyType } from '../Typography/types';

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
	Icon?: IconType,
	Typography?: TypographyType,
	Chip?: ChipType,
}

interface ColorVararits {
	light: string
	main: string
	dark: string
	contrastText: string
}

// color types
export type Color = 'primary' | 'secondary' | 'default';

// types when import icon inside other components (Button, Input, etc)
export type IconInComponentType = IconProps | string | ReactNode;