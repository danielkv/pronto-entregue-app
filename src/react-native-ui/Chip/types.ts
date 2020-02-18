import { StyleProp, ViewStyle, TextStyle, TextProps } from 'react-native';

import { Color } from '../theme/types';

export interface ChipType {
	variant?: "default" | "outlined",
	color?: Color,
	style?: ChipStyles
}
export interface ChipStyles {
	default?: ChipVariantStyles,
	outlined?: ChipVariantStyles,
}

interface ChipVariantStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
}

export interface ChipProps extends Omit<ChipType, 'style'>, Omit<TextProps, 'style'> {
	children?: string,
	label?: string,
	style?: ChipVariantStyles,
}