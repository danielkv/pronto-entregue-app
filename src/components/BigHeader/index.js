import React from 'react';
import { Extrapolate } from 'react-native-reanimated';
import { useSafeArea } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/core';

import { IconButton } from '../../react-native-ui';
import { BigHeaderContainer, BigHeaderImage, BigHeaderTitle } from './styles';

function BigHeader({ title, image, variant='default', scrollY, imageStyle={} }) {
	const navigation = useNavigation();
	const insets = useSafeArea();

	const minHeight = 80 + insets.top;
	const maxHeight = 200;

	let headerHeight = maxHeight;
	let imageOpacity = .3;
	let borderRadius = 30;
	
	if (scrollY) {
		headerHeight = scrollY.interpolate({
			inputRange: [0, maxHeight-minHeight],
			outputRange: [maxHeight, minHeight],
			extrapolate: Extrapolate.CLAMP
		})
		imageOpacity = scrollY.interpolate({
			inputRange: [0, 100],
			outputRange: [0.3, 0],
			extrapolate: Extrapolate.CLAMP
		})
		borderRadius = scrollY.interpolate({
			inputRange: [0, maxHeight-minHeight],
			outputRange: [30, 0],
			extrapolate: Extrapolate.CLAMP
		})
	} else {
		if (variant === 'small') {
			headerHeight = minHeight;
			imageOpacity = 0;
			borderRadius = 0;
		}
	}

	return <BigHeaderContainer style={{
		position: scrollY ? 'absolute' : 'relative',
		top: 0,
		left: 0,
		right: 0,
		height: headerHeight,
		paddingTop: insets.top,
		borderBottomLeftRadius: borderRadius,
		borderBottomRightRadius: borderRadius
	}}>
		{Boolean(image) && <BigHeaderImage style={[{ left: -40, marginTop: -35, opacity: imageOpacity }, imageStyle]} source={image} />}
		{navigation.canGoBack() && <IconButton onPress={()=>navigation.goBack()} icon={{ name: 'chevron-left', color: '#fff', size: 28 }} />}
		<BigHeaderTitle>{title}</BigHeaderTitle>
	</BigHeaderContainer>
}

export default BigHeader;