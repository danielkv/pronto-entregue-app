import React from 'react';

import { useNavigation } from '@react-navigation/core';

import { Typography, Chip, Avatar } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import ClosedCompanyChip from '../ClosedCompanyChip';
import { Container, ContentContainer, FooterContainer, FooterContent } from './styles';

export default function ProductItem({ item: product, showClosedTag=true }) {
	const featuredPrice = product?.sale?.progress ? product.sale.price : product.fromPrice;
	const standardPrice = product?.sale?.progress ? product.fromPrice : false;
	const navigation = useNavigation();

	const params = {
		productId: product.id,
		productName: product.name,
		productImage: product.image
	}

	const opacity = !product.company.isOpen && showClosedTag ? .5 : 1;

	return (
		<Container onPress={()=> navigation.navigate('ProductScreen', params)}>
			<Avatar
				image={product.image}
				alt={product.image}
				size={110}
				style={{ root: { opacity } }}
			/>
			<ContentContainer style={{ opacity }}>
				<Typography style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: '#655A51' }}>{product.name}</Typography>
				<Typography style={{ fontSize: 14, color: '#655A51' }}>{product.company.displayName}</Typography>
				{!product.company.isOpen && showClosedTag && <ClosedCompanyChip />}
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
