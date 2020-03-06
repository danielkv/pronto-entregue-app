import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { cloneDeep } from 'lodash';

import CartButton from '../../components/CartButton';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import Toast from '../../components/Toast';

import { Paper, Typography, Icon, IconButton, TextField, useTheme } from '../../react-native-ui';
import { getErrors } from '../../utils/errors';
import { calculateProductPrice, checkProductRules, sanitizeCartData } from '../../utils/products';
import Inline from './Inline';
import Panel from './Panel';
import {
	Container,
	HeaderImageBackgroundContainer,
	HeaderContainer,
	ProductContainer,
	CartButtonContainer,
	QuantityContainer,
	QuantityTitle,
	Quantity,
} from './styles';

import { ADD_CART_ITEM } from '../../graphql/cart';
import { LOAD_PRODUCT } from '../../graphql/products';


export default function Product() {
	const { params: { productId, productName, productImage, productDescription } } = useRoute();
	const { palette } = useTheme();
	const navigation = useNavigation();

	const [cartButtonHidden, setCartButtonHidden] = useState(false);
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const client = useApolloClient();
	const totalPrice = useMemo(()=>{
		if (product) return calculateProductPrice(product) * quantity;

		return 0;
	}, [product, calculateProductPrice, quantity]);

	const { data: productData, loading: loadingProduct, error: productError } = useQuery(LOAD_PRODUCT, { variables: { id: productId }, fetchPolicy: 'cache-and-network' });
	
	useEffect(()=>{
		if (productError) setProduct(null);
		else if (productData) setProduct(cloneDeep(productData.product));
	}, [productData, loadingProduct, productError]);
	
	// set HEADER transparent
	useEffect(()=>{
		navigation.setParams({ headerTransparent: true });
	}, []);
	
	const resetProduct = () => {
		setProduct(cloneDeep(productData.product));
		setQuantity(1);
	}

	// Share link
	async function handleShare () {
		return;
	}

	const handleItemSelect = useCallback((optionsGroups) => {
		const newProduct = { ...product };
		newProduct.optionsGroups = optionsGroups;

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
						Toast.show('Produto adicionado à cesta');
					})
					.catch((err)=>{
						Alert.alert(getErrors(err));
					})
			}
		} catch (err) {
			Alert.alert(err.message);
		}
	}

	if (productError) return <ErrorBlock error={getErrors(productError)} />

	return (
		<Container>
			<ProductContainer>
				<HeaderContainer>
					<HeaderImageBackgroundContainer source={{ uri: productImage }}>

						<LinearGradient
							colors={['#0000', '#000f']}
							style={{ justifyContent: 'flex-end', paddingTop: 45, paddingBottom: 60, paddingHorizontal: 35 }}
						>
							<View style={{ flexDirection: 'row' }}>
								<IconButton icon={{ name: 'share-2', color: 'white' }} onPress={handleShare} />
								<IconButton icon={{ name: 'heart', color: 'white' }} />
							</View>
							<Typography style={{ marginBottom: 10, fontSize: 24, color: '#fff', fontWeight: 'bold', textShadowColor: '#000c', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 12 }}>{productName}</Typography>
							<Typography style={{ color: 'white', textShadowColor: '#000a', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 8 }}>{product?.description || productDescription}</Typography>
						</LinearGradient>

					</HeaderImageBackgroundContainer>
				</HeaderContainer>
				<Paper style={{ marginTop: -45 }}>
					
					{loadingProduct || !product
						? <LoadingBlock />
						: (
							<>
								{product.type === 'inline'
									? <Inline optionsGroups={product.optionsGroups} onItemSelect={handleItemSelect} />
									: <Panel optionsGroups={product.optionsGroups} onItemSelect={handleItemSelect} />}

								<Typography style={{ marginTop: 20, marginBottom: 10 }}>Observações</Typography>
								<TextField
									style={{
										inputContainer: { backgroundColor: palette.background.main, height: 180 }
									}}
									onFocus={()=>setCartButtonHidden(true)}
									onBlur={()=>setCartButtonHidden(false)}
									textAlignVertical='top'
									multiline
									numberOfLines={8}
								/>
							</>
						)
					}

				</Paper>


			</ProductContainer>

			{(!cartButtonHidden && !loadingProduct) && <CartButtonContainer>
				<QuantityContainer>
					<QuantityTitle>Quantidade</QuantityTitle>

					<TouchableOpacity
						onPress={()=>{
							if (quantity > 1) setQuantity(quantity - 1);
						}}
					>
						<Icon name='minus-circle' color='#fff' />
					</TouchableOpacity>
					
					<Quantity>{quantity.toString()}</Quantity>

					<TouchableOpacity
						onPress={()=> {
							setQuantity(quantity + 1);
						}}
					>
						<Icon name='plus-circle' color='#fff' />
					</TouchableOpacity>
				</QuantityContainer>
				<CartButton title='Adicionar à cesta' forceShowPrice onPress={handleCartButtonPress} price={totalPrice} icon='cart' />
			</CartButtonContainer>}
		</Container>
	);
}
