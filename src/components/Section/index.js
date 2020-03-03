import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography } from '../../react-native-ui'
import { BRL } from '../../utils/currency';
import { Container, BgImage } from './styles';

export default function Section({ section }) {
	const navigation = useNavigation();

	return (
		<Container onPress={() => {} }>
			<BgImage source={{ uri: section.image }}>
				<View>
					<LinearGradient
						colors={['#0000', '#000f']}
						style={{ paddingHorizontal: 15, paddingVertical: 10 }}
					>
						<Typography variant='title' style={{ color: '#fff', fontSize: 16 }}>{section.name}</Typography>
						{Boolean(section.fromPrice) && <Typography variant='subtitle' style={{ color: '#fff', fontSize: 14 }}>{BRL(section.fromPrice).format()}</Typography>}
					</LinearGradient>
				</View>
			</BgImage>
		</Container>
	);
}
