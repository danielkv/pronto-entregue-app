import { StyleProp, TextStyle, TextProps } from 'react-native';

export interface TypographyType {
	variant?: "button" | "text" | "title" | "subtitle" | "h1" | "h2" | "h3" | "h4" | "h5",
	style?: TypographyStyles
}
export interface TypographyStyles {
	text?: StyleProp<TextStyle>,
	title?: StyleProp<TextStyle>,
	subtitle?: StyleProp<TextStyle>,
	button?: StyleProp<TextStyle>,
	error?: StyleProp<TextStyle>,
	h1?: StyleProp<TextStyle>,
	h2?: StyleProp<TextStyle>,
	h3?: StyleProp<TextStyle>,
	h4?: StyleProp<TextStyle>,
	h5?: StyleProp<TextStyle>
}

export interface TypographyProps extends Pick<TypographyType, 'variant'>, Omit<TextProps, 'style'> {
	children: string,
	style: StyleProp<TextStyle>,
}