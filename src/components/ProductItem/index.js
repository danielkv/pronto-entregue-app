import React from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Typography, Chip } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import { Container, ContentContainer, FooterContainer, FooterContent } from './styles';

export default function ProductItem({ item: product }) {
	const featuredPrice = product?.sale?.progress ? product.sale.price : product.fromPrice;
	const standardPrice = product?.sale?.progress ? product.fromPrice : false;
	const navigation = useNavigation();

	const params = {
		productId: product.id,
		productName: product.name,
		productImage: product.image
	}

	return (
		<Container onPress={()=> navigation.navigate('ProductScreen', params)}>
			<Image
				source={{ uri: product.image }}
				style={{
					width: 110,
					height: 110,
					borderRadius: 55,
				}}
			/>
			<ContentContainer>
				<Typography style={{ fontSize: 20, fontWeight: 'bold', color: '#655A51' }}>{product.name}</Typography>
				<Typography style={{ fontSize: 14, color: '#655A51' }}>{product.company.displayName}</Typography>
				<FooterContainer>
					<FooterContent>
						{standardPrice && <Typography style={{ marginRight: 5, textDecorationLine: 'line-through' }}>{BRL(standardPrice).format()}</Typography>}
						<Chip
							variant={product?.sale?.progress ? 'default' : 'outlined'}
							color={product?.sale?.progress ? 'secondary' : 'default'}
							style={{ root: { height: 33, paddingHorizontal: 10 } }}
							label={BRL(featuredPrice).format()}
						/>
					</FooterContent>
				</FooterContainer>
			</ContentContainer>
		</Container>
	);
}
