import { ReactNode } from 'react';

import { AvatarType } from '../Avatar/types';
import { BadgeType } from '../Badge/types';
import { ButtonType } from '../Button/types';
import { ChipType } from '../Chip/types';
import { DividerType } from '../Divider/types';
import { FormHelperTextType } from '../FormHelperText/types';
import { IconType, IconProps } from '../Icon/types';
import { IconButtonType } from '../IconButton/types';
import { PaperType } from '../Paper/types';
import { TextFieldType } from '../TextField/types';
import { TypographyType } from '../Typography/types';

export interface Theme {
	palette?: {
		primary?: ColorVariants;
		secondary?: ColorVariants;
		default?: ColorVariants;
		background?: ColorVariants;
		divider?: string;
		gray?: string;
		text?: {
			default?: string,
			button?: string,
			title?: string,
			subtitle?: string,
			h1?: string,
			h2?: string,
			h3?: string,
			h4?: string,
			h5?: string
		};
		error?: ColorVariants
	};
	TextField?: TextFieldType,
	FormHelperText?: FormHelperTextType,
	Button?: ButtonType,
	IconButton?: IconButtonType,
	Icon?: IconType,
	Typography?: TypographyType,
	Chip?: ChipType,
	Paper?: PaperType,
	Avatar?: AvatarType,
	Divider?: DividerType,
	Badge?: BadgeType,
}

interface ColorVariants {
	light: string
	main: string
	dark: string
	contrastText: string
}

// color types
export type Color = 'primary' | 'secondary' | 'default';

// types when import icon inside other components (Button, Input, etc)
export type IconInComponentType = IconProps | string | ReactNode;