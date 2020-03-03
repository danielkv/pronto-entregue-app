import React from 'react';
import { View } from 'react-native';

import { TextField, useTheme } from '../../../react-native-ui';

export default function SearchBlock() {
	const { palette } = useTheme();
	return (
		<View>
			<TextField label='Pesquisar' style={{ inputContainer: { backgroundColor: palette.background.main } }} />
		</View>
	);
}
