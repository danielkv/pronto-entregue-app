import React from 'react';
import { View } from 'react-native';

import { merge, cloneDeep } from 'lodash';

import { useTheme } from '../utils';
import { PaperProps } from './types';

function Paper(props: PaperProps) {
	const { Paper } = useTheme();
	const variant = props.variant || Paper.variant;
	
	const componentStyle = cloneDeep(Paper.style)

	const componentStandardStyle = componentStyle['default'];
	const componentVariantStyle = componentStyle[variant];

	const styles = merge(componentStandardStyle, componentVariantStyle, props.style);

	return (
		<View {...props} style={styles}>
			{props.children}
		</View>
	);
}

export default React.memo(Paper);