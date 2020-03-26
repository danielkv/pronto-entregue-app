import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography } from '../../../../react-native-ui'
import { BRL } from '../../../../utils/currency';
import { Container, BgImage } from './styles';

export default function BestSellerItem({ item: product }) {
	const navigation = useNavigation();

	const params = {
		productId: product.id,
		productName: product.name,
		productImage: product.image,
		productDescription: product.description
	}

	return (
		<Container onPress={() => navigation.push('ProductScreen', params) }>
			<BgImage source={{ uri: product.image }}>
				<View>
					<LinearGradient
						colors={['#0000', '#000f']}
						style={{ paddingHorizontal: 15, paddingVertical: 10 }}
					>
						<Typography variant='title' style={{ color: '#fff', fontSize: 16 }}>{product.name}</Typography>
						{Boolean(product.fromPrice) && <Typography variant='subtitle' style={{ color: '#fff', fontSize: 14 }}>{BRL(product.fromPrice).format()}</Typography>}
					</LinearGradient>
				</View>
			</BgImage>
		</Container>
	);
}
