import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Typography, Icon, useTheme } from '../../../react-native-ui';

export default function SearchBox() {
	const { palette } = useTheme();
	const navigation = useNavigation();

	return (
		<View style={{ marginHorizontal: 15, marginBottom: 25 }}>
			<Typography variant='subtitle' style={{ color: palette.background.dark, fontSize: 16, marginBottom: 8, marginLeft: 20 }}>Não encontrou o que procurava?</Typography>
			<TouchableWithoutFeedback onPress={()=>navigation.navigate('SearchScreen')}>
				<View style={{ backgroundColor: '#fff', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 25 }}>
					<Typography style={{ color: palette.background.dark, fontSize: 16 }}>Busque aqui</Typography>
					<Icon name='search' color={palette.background.dark} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}