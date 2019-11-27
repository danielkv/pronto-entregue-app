import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	Shine
} from 'rn-placeholder';

import {
	Container,
	Card,
	ProductContainer,
	ProductImageContainer,
	ProductImage,
	ProductInfoContainer,
	ProductTitle,
	ProductDescription,
	ProductWrapper
} from './styles';
import { GET_CATEGORY } from '../../graphql/categories';
import CartButton from '../../components/CartButton';

export default function category({ route, navigation }) {
	const { category_id } = route.params;

	const { data: categoryData, loading: loadingCategory } = useQuery(GET_CATEGORY, { variables: { id: category_id } });
	const products = !loadingCategory && categoryData && categoryData.category ? categoryData.category.products : [];

	useEffect(()=>{
		if (categoryData && categoryData.category && categoryData.category.name) {
			navigation.setParams({
				headerTitle: categoryData.category.name
			});
		}
	}, [categoryData]);

	const renderProductItem = ({ item: { id, name, description, image, options_qty, price } }) => {
		const openProduct = () => { navigation.navigate('ProductScreen', { product_id: id }) };
		const buttonIcon = options_qty ? 'page-next-outline' : 'cart-plus';
		const buttonTitle = options_qty ? 'Ver opções' : 'Colocar no carrinho';
		const buttonPrice = options_qty ? null : price;
		const buttonAction = options_qty ? openProduct : () => {}
		
		return (
			<ProductContainer onPress={openProduct}>
				<ProductWrapper>
					<ProductImageContainer>
						<ProductImage source={{ uri: image }} />
					</ProductImageContainer>
					<ProductInfoContainer>
						<ProductTitle>{name}</ProductTitle>
						<ProductDescription>{description}</ProductDescription>
					</ProductInfoContainer>
				</ProductWrapper>
				<CartButton onPress={buttonAction} title={buttonTitle} icon={buttonIcon} price={buttonPrice} />
			</ProductContainer>
		);
	}

	if (loadingCategory) {
		return (
			<Container>
				<Card>
					<Placeholder
						Animation={Shine}
						Left={PlaceholderMedia}
					>
						<PlaceholderLine width={100} />
						<PlaceholderLine width={60} />
					</Placeholder>
				</Card>
				<Card>
					<Placeholder
						Animation={Shine}
						Left={PlaceholderMedia}
					>
						<PlaceholderLine width={100} />
						<PlaceholderLine width={60} />
					</Placeholder>
				</Card>
			</Container>
		)
	}

	return (
		<Container>
			<FlatList
				data={products}
				renderItem={renderProductItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</Container>
	);
}
