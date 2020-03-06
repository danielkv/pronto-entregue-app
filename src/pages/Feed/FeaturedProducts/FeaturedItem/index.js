import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography, Chip } from '../../../../react-native-ui'
import { Container, BgImage, TextContainer } from './styles';

export default function FeaturedItem({ item: product, config }) {
	const navigation = useNavigation();

	const diff = product.price - product.sale.price;
	const pct = Math.floor(diff * 100 / product.price);

	const params = {
		productId: product.id,
		productName: product.name,
		productImage: product.image,
		productDescription: product.description
	}

	return (
		<Container onPress={()=>{navigation.navigate('ProductScreen', params)}}>
			<BgImage config={config} source={{ uri: product.image }}>
				<View>
					<LinearGradient
						colors={['#0000', '#000f']}
						style={{ paddingHorizontal: 15, paddingBottom: 15, paddingTop: 20 }}
					>
						<TextContainer>
							<Typography variant='subtitle' style={{ color: '#fff' }}>{product.company.displayName}</Typography>
							<Typography variant='title' style={{ color: '#fff' }}>{product.name}</Typography>
						</TextContainer>
					</LinearGradient>
				</View>
				<Chip
					label={`-${pct}%`}
					color='secondary'
					style={{
						root: {
							borderTopRightRadius: 0,
							borderBottomRightRadius: 15,
							position: 'absolute',
							bottom: 0,
							right: 0
						}
					}}
				/>
			</BgImage>
		</Container>
	);
}
