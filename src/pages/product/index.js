import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { LOAD_PRODUCT } from '../../graphql/products';

import LoadingBlock from '../../components/loadingBlock';
import CartButton from '../../components/cartButton';

import {
	Container,
	HeaderImageBackgroundContainer,
	HeaderContainer,
	ProductDescription,
	ProductContainer,
	CartButtonContainer,
	GroupsContainer
} from './styles';
import { calculateProductPrice } from '../../utils/products';

import Inline from './inline';
import Panel from './panel';

export default function Product() {
	const route = useRoute();
	// const {product_id} = route.params;
	const product_id = 3;
	const [product, setProduct] = useState(null);

	const { data: productData, loading: loadingProduct, error } = useQuery(LOAD_PRODUCT, { variables: { id: product_id } });

	useEffect(()=>{
		if (error) setProduct(null);
		else if (!loadingProduct && productData) setProduct(productData.product);
	}, [productData, loadingProduct, error])

	const totalPrice = useMemo(()=>{
		if (product) return calculateProductPrice(product);

		return 0;
	}, [product, calculateProductPrice]);

	const handleItemSelect = useCallback((optionsGroups) => {
		const newProduct = { ...product };
		newProduct.options_groups = optionsGroups;

		setProduct(newProduct);
	}, [product, setProduct]);

	if (loadingProduct || !product) return <LoadingBlock />;

	return (
		<Container>
			<ProductContainer>
				<HeaderContainer>
					<HeaderImageBackgroundContainer source={{ uri: product.image }}>

						<LinearGradient
							colors={['rgba(255,124,3,0)', 'rgba(255,124,3,1)']}
							style={{ justifyContent: 'flex-end', paddingTop: 30, paddingBottom: 20 }}
						>
							<ProductDescription>{product.description}</ProductDescription>
						</LinearGradient>

					</HeaderImageBackgroundContainer>
				</HeaderContainer>

				<GroupsContainer>
					{/* <Inline optionsGroups={product.options_groups} onItemSelect={handleItemSelect} /> */}
					<Panel optionsGroups={product.options_groups} onItemSelect={handleItemSelect} />
				</GroupsContainer>

			</ProductContainer>
			<CartButtonContainer>
				<CartButton title='Adicionar ao Carrinho' forceShowPrice price={totalPrice} icon='cart' />
			</CartButtonContainer>
		</Container>
	);
}
