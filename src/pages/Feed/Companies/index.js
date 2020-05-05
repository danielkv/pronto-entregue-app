import React from 'react';
import { View } from 'react-native';

import CompanyItem from '../../../components/CompanyItem';

import { Typography, useTheme, Icon } from '../../../react-native-ui';

// import { Container } from './styles';

export default function Companies({ companies }) {
	const { palette } = useTheme();

	return (
		<View style={{ marginVertical: 20 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: 10 }}>
				<Typography variant='subtitle' style={{ color: palette.background.dark, fontSize: 16 }}>Estabelecimentos perto de você</Typography>
				<Icon name='info' size={18} color={palette.background.dark} />
			</View>
			<View style={{ marginTop: 10 }}>
				{companies.map(company => <CompanyItem key={company.id} item={company} />)}
			</View>
		</View>
	);
}