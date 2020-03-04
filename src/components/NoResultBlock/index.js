import React from 'react';
import { View } from 'react-native';

import { Icon, Typography, Button, useTheme } from '../../react-native-ui';

export default function NoResultBlock() {
	const { palette } = useTheme();

	return (
		<View style={{ alignItems: 'center', marginTop: 10 }}>
			<Icon name='x-circle' size={30} color={palette.background.dark} />
			<Typography style={{ marginTop: 5, marginBottom: 10, color: palette.background.dark }}>Nenhum resultado encontrado</Typography>
			<Button icon='message-circle' variant='outlined' color='primary'>Indique um estabelecimento</Button>
		</View>
	);
}
