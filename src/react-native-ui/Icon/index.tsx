import React from 'react';
import { View } from 'react-native';

import { useTheme } from '../utils';
import { getIconComponent } from './iconTypes';
import { IconProps } from './types';

export default function Icon(props: IconProps) {
	const { Icon } = useTheme();
	const color = props.color || Icon.color;
	const size = props.size || Icon.size;
	const type = props.type || Icon.type;

	const rootStyles = [Icon.style.root, props.style?.root || {}]

	const IconComponent = getIconComponent(type);

	return (
		<View {...props} style={rootStyles}>
			<IconComponent name={props.name} color={color} size={size}  />
		</View>
	)
}