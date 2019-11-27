import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Container, ProductTitle, ProductSubtitle } from './styles';

export default function FeaturedProduct({ product: { id, name, image, price } }) {
	const navigation = useNavigation();

	return (
		<Container source={{ uri: image }}>
			<TouchableOpacity onPress={()=>navigation.navigate('ProductScreen', { product_id: id, headerTitle: name })}>
				<LinearGradient
					colors={['rgba(255,124,3,0)', 'rgba(255,124,3,1)']}
					style={{ justifyContent: 'flex-end', paddingTop: 30, paddingBottom: 20 }}
				>
					<ProductTitle h2>{name}</ProductTitle>
					{!!price && (
						<ProductSubtitle h3>
							{`a partir de R$ ${price.toFixed(2).replace('.', ',')}`}
						</ProductSubtitle>
					)}
				</LinearGradient>
			</TouchableOpacity>
		</Container>
	);
}
