import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface AvatarType {
	variant?: "rounded" | "circle" | 'square',
	size?: Number,
	style?: AvatarStyles
}
export interface AvatarStyles {
	rounded?: AvatarVariantStyles,
	circle?: AvatarVariantStyles,
	square?: AvatarVariantStyles,
}

interface AvatarVariantStyles {
	root?: StyleProp<ViewStyle>,
	text?: StyleProp<TextStyle>,
	image?: StyleProp<ImageStyle>,
}

export interface AvatarProps extends Omit<AvatarType, 'style'> {
	style?: AvatarVariantStyles,
	image?: string,
	children: string,
	alt: string
}