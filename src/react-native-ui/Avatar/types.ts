import { StyleProp, ViewStyle, ImageProps, TextStyle, ImageStyle } from 'react-native';

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

export interface AvatarProps extends Omit<AvatarType, 'style'>, Omit<ImageProps, 'style'> {
	style?: AvatarVariantStyles,
	children: string,
	alt?: string
}