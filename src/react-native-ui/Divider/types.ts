import { StyleProp, ViewStyle, ViewProps } from 'react-native';

export interface DividerType {
	variant?: "default" | "middle",
	style?: DividerStyles
}
export interface DividerStyles {
	default?: StyleProp<ViewStyle>,
	middle?: StyleProp<ViewStyle>,
}

export interface DividerProps extends Omit<DividerType, 'style'>, ViewProps {
	children: string,
}