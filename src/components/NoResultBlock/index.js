import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Icon, Typography, Button, useTheme } from '../../react-native-ui';

export default function NoResultBlock({ message, suggestCompany=true }) {
	const { palette } = useTheme();
	const navigation = useNavigation();

	return (
		<View style={{ alignItems: 'center', marginTop: 25, marginBottom: 15 }}>
			<Icon name='x-circle' size={30} color={palette.background.dark} />
			<Typography style={{ marginTop: 5, marginBottom: 25, color: palette.background.dark }}>{message || 'Nenhum resultado encontrado'}</Typography>
			{Boolean(suggestCompany) && <Button icon='message-circle' variant='outlined' onPress={()=>navigation.navigate('SuggestCompany')} color='primary'>Indique um estabelecimento</Button>}
		</View>
	);
}
