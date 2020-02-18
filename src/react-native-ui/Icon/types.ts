import { StyleProp, ViewStyle, ViewProps } from 'react-native';

export type iconType = 'zocial' |
	'octicon' |
	'material' |
	'material-community' |
	'ionicons' |
	'foundation' |
	'envilicons' |
	'entypo' |
	'font-awesome' |
	'simple-line-icon' |
	'feather' |
	'antdesign';

export interface IconType {
	color?: string,
	size?: number,
	type?: iconType,
	style?: IconVariantStyles,
}

interface IconVariantStyles {
	root?: StyleProp<ViewStyle>,
}

export interface IconProps extends IconType, Omit<ViewProps, 'style'> {
	name: string,
}

