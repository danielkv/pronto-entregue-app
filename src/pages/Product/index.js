import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-tiny-toast';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { cloneDeep } from 'lodash';

import CartButton from '../../components/CartButton';
import LoadingBlock from '../../components/LoadingBlock';

import { getErrors } from '../../utils/errors';
import { calculateProductPrice, checkProductRules, sanitizeCartData } from '../../utils/products';
import Inline from './Inline';
import Panel from './Panel';
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

import { ADD_CART_ITEM } from '../../graphql/cart';
import { LOAD_PRODUCT } from '../../graphql/products';


export default function Product() {
	const { params: { productId=null } = {} } = useRoute();
	const navigation = useNavigation();

	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const client = useApolloClient();
	const totalPrice = useMemo(()=>{
		if (product) return calculateProductPrice(product) * quantity;

		return 0;
	}, [product, calculateProductPrice, quantity]);

	const { data: productData, loading: loadingProduct, error } = useQuery(LOAD_PRODUCT, { variables: { id: productId } });
	
	useEffect(()=>{
		if (error) setProduct(null);
		else if (productData) setProduct(cloneDeep(productData.product));
	}, [productData, loadingProduct, error]);
	
	useEffect(()=>{
		if (product && product.name) {
			navigation.setParams({
				headerTitle: product.name
			});
		}
	}, [product]);
	
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
					variables: { data: sanitizeCartData({ ...product, price: totalPrice, quantity }) }
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
