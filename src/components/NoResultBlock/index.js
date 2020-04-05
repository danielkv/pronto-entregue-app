import React from 'react';
import { View } from 'react-native';

import { Icon, Typography, Button, useTheme } from '../../react-native-ui';

export default function NoResultBlock({ message, suggestCompany=true }) {
	const { palette } = useTheme();

	return (
		<View style={{ alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
			<Icon name='x-circle' size={30} color={palette.background.dark} />
			<Typography style={{ marginTop: 5, marginBottom: 10, color: palette.background.dark }}>{message || 'Nenhum resultado encontrado'}</Typography>
			{Boolean(suggestCompany) && <Button icon='message-circle' variant='outlined' color='primary'>Indique um estabelecimento</Button>}
		</View>
	);
}
