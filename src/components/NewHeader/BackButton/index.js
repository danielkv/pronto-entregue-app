import React from 'react';

import { useNavigation } from '@react-navigation/core';

import { IconButton } from '../../../react-native-ui';

export default function BackButton({ color }) {
	const navigation = useNavigation();
	const navigationState = navigation?.canGoBack?.() ?? false;

	const canGoBack = navigationState;
	
	function handlePressBackButton () {
		if (navigation.canGoBack())
			navigation.goBack();
	}

	if (!canGoBack) return false;

	return (
		<IconButton icon={{ name: 'chevron-left', color }} onPress={handlePressBackButton} />
	);
}
