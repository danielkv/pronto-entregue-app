import React, { useState } from 'react';
import { View, Image } from 'react-native';

import { merge, cloneDeep } from 'lodash';

import Typography from '../Typography';
import { useTheme } from '../utils';
import { AvatarProps } from './types';

export default function Avatar(props: AvatarProps) {
	const { palette, Avatar } = useTheme();
	const [alternative, setAlternative] = useState(false);
	const variant = props.variant || Avatar.variant;

	const shotAlt = props.alt.split(' ').map(word => word.substr(0,1)).join('');
	
	const componentStyle = cloneDeep(Avatar.style)

	const componentStandardStyle = componentStyle['circle'];
	const componentVariantStyle = componentStyle[variant];

	const styles = merge({ root: { backgroundColor: palette.background.dark }, text: { color: palette.background.contrastText } }, componentStandardStyle, componentVariantStyle, props.style);

	return (
		<View style={styles.root}>
			{alternative || props.children
				? <Typography variant='title' style={styles.text}>{props.children || shotAlt}</Typography>
				: <Image {...props} style={styles.image} onError={()=>{setAlternative(true)}} />}
		</View>
	);
}
