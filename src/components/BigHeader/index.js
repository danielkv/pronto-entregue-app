import React from 'react';
import { Extrapolate } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/core';

import { IconButton } from '../../react-native-ui';
import { BigHeaderContainer, BigHeaderImage, BigHeaderTitle } from './styles';

function BigHeader({ title, image, scrollY, imageStyle={} }) {
	const navigation = useNavigation();

	let headerHeight = 200;
	let imageOpacity = .3;
	let borderRadius = 30;
	
	if (scrollY) {
		headerHeight = scrollY.interpolate({
			inputRange: [0,120],
			outputRange: [200, 80],
			extrapolate: Extrapolate.CLAMP
		})
		imageOpacity = scrollY.interpolate({
			inputRange: [0, 100],
			outputRange: [0.3, 0],
			extrapolate: Extrapolate.CLAMP
		})
		borderRadius = scrollY.interpolate({
			inputRange: [0,120],
			outputRange: [30, 0],
			extrapolate: Extrapolate.CLAMP
		})
	}

	return <BigHeaderContainer style={{
		position: scrollY ? 'absolute' : 'static',
		top: 0,
		left: 0,
		right: 0,
		height: headerHeight,
		borderBottomLeftRadius: borderRadius,
		borderBottomRightRadius: borderRadius
	}}>
		<BigHeaderImage style={[{ left: -40, marginTop: -35, opacity: imageOpacity }, imageStyle]} source={image} />
		<IconButton onPress={()=>navigation.goBack()} icon={{ name: 'chevron-left', color: '#fff', size: 28 }} />
		<BigHeaderTitle>{title}</BigHeaderTitle>
	</BigHeaderContainer>
}

export default BigHeader;