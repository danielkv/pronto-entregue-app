import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography, Chip } from '../../../../react-native-ui'
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
						
						<View>
							{Boolean(product.fromPrice) && <Typography variant='subtitle' style={{ color: '#fff', fontSize: 14, textDecorationLine: product?.sale?.progress ? 'line-through' : 'none' }}>{BRL(product.fromPrice).format()}</Typography>}
							{Boolean(product?.sale?.progress) && (
								<Chip
									label={BRL(product.sale.price).format()}
									style={{ root: { height: 25, paddingHorizontal: 10, marginTop: 4 }, text: { fontSize: 13 } }}
									color='secondary'
								/>)}

						</View>
						<Typography variant='title' style={{ color: '#fff', fontSize: 14 }}>{product.name}</Typography>
					</LinearGradient>
				</View>
			</BgImage>
		</Container>
	);
}
