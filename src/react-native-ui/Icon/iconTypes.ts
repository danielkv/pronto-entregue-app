import {
	AntDesign,
	Entypo,
	EvilIcons,
	Feather,
	FontAwesome,
	Foundation,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
	Zocial,
} from '@expo/vector-icons'

import { iconType } from './types';

export function getIconComponent(type: iconType) {
	switch (type) {
		case 'zocial':
			return Zocial;
		case 'octicon':
			return Octicons;
		case 'material-community':
			return MaterialCommunityIcons;
		case 'ionicons':
			return Ionicons;
		case 'foundation':
			return Foundation;
		case 'envilicons':
			return EvilIcons;
		case 'entypo':
			return Entypo;
		case 'font-awesome':
			return FontAwesome;
		case 'feather':
			return Feather;
		case 'antdesign':
			return AntDesign;
		case 'material':
		default:
			return MaterialIcons;
	}
}