import React from 'react';

import { useNavigation } from '@react-navigation/core';

import { IconButton } from '../../../react-native-ui';

export default function BackButton({ navigation, color }) {
	const navigationState = navigation?.canGoBack?.() ?? false;

	const canGoBack = navigationState;

	function handlePressBackButton() {
		if (navigation.canGoBack())
			navigation.goBack();
	}

	if (!canGoBack) return false;

	return (
		<IconButton icon={{ name: 'arrow-left', color, size: 24 }} style={{ root: { marginLeft: -10 } }} onPress={handlePressBackButton} />
	);
}
