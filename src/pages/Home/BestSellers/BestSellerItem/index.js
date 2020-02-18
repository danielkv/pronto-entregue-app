import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography } from '../../../../react-native-ui'
import { BRL } from '../../../../utils/currency';
import { Container, BgImage } from './styles';

export default function BestSellerItem({ item }) {
	const navigation = useNavigation();

	return (
		<Container onPress={() => navigation.navigate('ProductScreen', { productId: item.id }) }>
			<BgImage source={{ uri: item.image }}>
				<View>
					<LinearGradient
						colors={['#0000', '#000f']}
						style={{ paddingHorizontal: 15, paddingVertical: 10 }}
					>
						<Typography variant='title' style={{ color: '#fff', fontSize: 16 }}>{item.name}</Typography>
						{Boolean(item.fromPrice) && <Typography variant='subtitle' style={{ color: '#fff', fontSize: 14 }}>{BRL(item.fromPrice).format()}</Typography>}
					</LinearGradient>
				</View>
			</BgImage>
		</Container>
	);
}
