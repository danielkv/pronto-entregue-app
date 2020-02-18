import { ReactNode } from 'react';
import { StyleProp, ViewStyle, ViewProps } from 'react-native';

export interface PaperType {
	variant?: "default" | "outlined",
	style?: PaperStyles
}
export interface PaperStyles {
	default?: StyleProp<ViewStyle>,
	outlined?: StyleProp<ViewStyle>,
}

export interface PaperProps extends Omit<PaperType, 'style'>, ViewProps {
	children?: ReactNode,
	style?: StyleProp<ViewStyle>
}