import React from 'react';
import { View } from 'react-native';

import { merge } from 'lodash';

import { useTheme } from '../utils';
import { getIconComponent } from './iconTypes';
import { IconProps } from './types';

export default function Icon(props: IconProps) {
	const { Icon } = useTheme();
	const color = props.color || Icon.color;
	const size = props.size || Icon.size;
	const type = props.type || Icon.type;
	const styles = merge(Icon.style, props.style);

	const IconComponent = getIconComponent(type)



	return (
		<View {...props} style={styles.root}>
			<IconComponent name={props.name} color={color} size={size}  />
		</View>
	)
}