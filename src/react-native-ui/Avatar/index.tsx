import React, { useState } from 'react';
import { View, Image } from 'react-native';

import Typography from '../Typography';
import { useTheme } from '../utils';
import { AvatarProps } from './types';

export default function Avatar(props: AvatarProps) {
	const { palette, Avatar } = useTheme();
	const [alternative, setAlternative] = useState(false);
	const variant = props.variant || Avatar.variant;
	const size = props.size || Avatar.size;

	const shotAlt = props.alt.split(' ').map(word => word.substr(0,1)).join('');

	const rootStyle = [
		Avatar.style.circle.root,
		Avatar.style[variant].root,
		{
			backgroundColor: palette.background.dark,
			width: size,
			height: size,
		},
		props?.style?.root || {}
	]
	
	const textStyle = [
		Avatar.style.circle.text,
		Avatar.style[variant].text,
		{ color: palette.background.contrastText },
		props?.style?.text || {}
	]
	
	const imageStyle = [
		Avatar.style.circle.image,
		Avatar.style[variant].image,
		{
			width: size,
			height: size
		},
		props?.style?.image || {}
	]
	
	return (
		<View style={rootStyle}>
			{alternative || props.children
				? <Typography variant='title' style={textStyle}>{props.children || shotAlt}</Typography>
				: <Image resizeMode='cover' {...props} style={imageStyle} onError={()=>{setAlternative(true)}} />}
		</View>
	);
}
