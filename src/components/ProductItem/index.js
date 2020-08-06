import React from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Typography, Chip, Icon } from '../../react-native-ui';
import { BRL } from '../../utils/currency';
import { Container, ContentContainer, FooterContainer, FooterContent } from './styles';

export default function ProductItem({ item: product, showCompanyName=true }) {
	const featuredPrice = product?.sale?.progress ? product.sale.price : product.fromPrice;
	const standardPrice = product?.sale?.progress ? product.fromPrice : false;
	const navigation = useNavigation();

	const params = {
		productId: product.id,
		productName: product.name,
		productImage: product.image,
		companyId: product.company.id
	}

	return (
		<Container onPress={()=> navigation.navigate('ProductScreen', params)}>
			<Image
				source={{ uri: product.image }}
				style={{
					width: 85,
					height: 85,
					borderRadius: 15,
					resizeMode: 'cover'
				}}
			/>
			<ContentContainer>
				<Typography style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: '#655A51' }}>{product.name}</Typography>
				<Typography style={{ fontSize: 12, color: '#655A51' }}>{showCompanyName && product?.company ? product.company.displayName : product.description}</Typography>
				<FooterContainer>
					<FooterContent>
						{standardPrice && <Typography style={{ marginRight: 5, textDecorationLine: 'line-through' }}>{BRL(standardPrice).format()}</Typography>}
						<Chip
							variant={product?.sale?.progress ? 'default' : 'outlined'}
							color={product?.sale?.progress ? 'secondary' : 'default'}
							style={{ root: { height: 26, paddingHorizontal: 10, paddingVertical: 0 }, text: { fontSize: 13 } }}
							label={BRL(featuredPrice).format()}
						/>
						{product.scheduleEnabled && <Icon name='calendar' type='material-community' style={{ root: { marginTop: 2 } }} size={20} color='#ccc' />}
					</FooterContent>
				</FooterContainer>
			</ContentContainer>
		</Container>
	);
}
