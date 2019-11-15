import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { cloneDeep } from 'lodash';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';

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
	GroupsContainer,
	QuantityContainer,
	QuantityTitle,
	Quantity,
} from './styles';
import { calculateProductPrice, checkProductRules, sanitizeCartData } from '../../utils/products';

import Inline from './inline';
import Panel from './panel';
import { ADD_CART_ITEM } from '../../graphql/cart';
import { getErrors } from '../../utils/errors';

export default function Product() {
	const route = useRoute();
	const { product_id } = route.params;
	// const product_id = 1;
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const client = useApolloClient();
	const totalPrice = useMemo(()=>{
		if (product) return calculateProductPrice(product) * quantity;

		return 0;
	}, [product, calculateProductPrice, quantity]);

	const { data: productData, loading: loadingProduct, error } = useQuery(LOAD_PRODUCT, { variables: { id: product_id } });

	useEffect(()=>{
		if (error) setProduct(null);
		else if (productData) setProduct(cloneDeep(productData.product));
	}, [productData, loadingProduct, error]);

	const resetProduct = () => {
		setProduct(cloneDeep(productData.product));
		setQuantity(1);
	}

	const handleItemSelect = useCallback((optionsGroups) => {
		const newProduct = { ...product };
		newProduct.options_groups = optionsGroups;

		setProduct(newProduct);
	}, [product, setProduct]);

	const handleCartButtonPress = () => {
		try {
			if (checkProductRules(product)) {
				client.mutate({
					mutation: ADD_CART_ITEM,
					variables: { data: sanitizeCartData({ ...product, price: totalPrice, quantity }) },
					// refetchQueries: [{ query: LOAD_PRODUCT, variables: { id: product_id } }]
				})
					.then(()=>{
						resetProduct();
						Toast.show('Produto adicionado ao carrinho');
					})
					.catch((err)=>{
						Alert.alert(getErrors(err));
					})
			}
		} catch (err) {
			Alert.alert(err.message);
		}
	}

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
					{product.type === 'inline'
						? <Inline optionsGroups={product.options_groups} onItemSelect={handleItemSelect} />
						: <Panel optionsGroups={product.options_groups} onItemSelect={handleItemSelect} />}
				</GroupsContainer>

			</ProductContainer>
			<CartButtonContainer>
				<QuantityContainer>
					<QuantityTitle>Quantidade</QuantityTitle>

					<TouchableOpacity
						onPress={()=>{
							if (quantity > 1) setQuantity(quantity - 1);
						}}
					>
						<Icon type='material-community' name='minus-circle-outline' color='#fff' />
					</TouchableOpacity>
					
					<Quantity>{quantity.toString()}</Quantity>

					<TouchableOpacity
						onPress={()=> {
							setQuantity(quantity + 1);
						}}
					>
						<Icon type='material-community' name='plus-circle-outline' color='#fff' />
					</TouchableOpacity>
				</QuantityContainer>
				<CartButton title='Adicionar ao Carrinho' forceShowPrice onPress={handleCartButtonPress} price={totalPrice} icon='cart' />
			</CartButtonContainer>
		</Container>
	);
}
