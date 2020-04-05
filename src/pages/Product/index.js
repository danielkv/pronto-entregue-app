import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { cloneDeep } from 'lodash';

import CartButton from '../../components/CartButton';
import CompanyPanel from '../../components/CompanyPanel';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import Toast from '../../components/Toast';

import { Paper, Typography, Icon, TextField, useTheme, Chip } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import { calculateProductPrice, checkProductRules, sanitizeCartData } from '../../utils/products';
import FavoriteButton from './FavoriteButton';
import Inline from './Inline';
import Panel from './Panel';
import {
	Container,
	HeaderImageBackgroundContainer,
	HeaderContainer,
	ProductContainer,
	QuantityContainer,
	QuantityTitle,
	Quantity,
} from './styles';

import { ADD_CART_ITEM } from '../../graphql/cart';
import { LOAD_PRODUCT } from '../../graphql/products';

export default function Product() {
	const { params: { productId, productName, productImage, productDescription } } = useRoute();
	const { palette } = useTheme();

	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [addCartItem, { loadingAddToCart }] = useMutation(ADD_CART_ITEM);

	const totalPrice = useMemo(()=>{
		if (product) return calculateProductPrice(product) * quantity;

		return 0;
	}, [product, calculateProductPrice, quantity]);

	const { data: productData, loading: loadingProduct, error: productError } = useQuery(LOAD_PRODUCT, { variables: { id: productId }, fetchPolicy: 'cache-and-network' });

	useEffect(()=>{
		if (productError) setProduct(null);
		else if (productData) setProduct(cloneDeep(productData.product));
	}, [productData, loadingProduct, productError]);
	
	const resetProduct = () => {
		setProduct(cloneDeep(productData.product));
		setQuantity(1);
	}

	// Share link
	/* async function handleShare () {
		return;
	} */

	const handleItemSelect = useCallback((optionsGroups) => {
		const newProduct = { ...product };
		newProduct.optionsGroups = optionsGroups;

		setProduct(newProduct);
	}, [product, setProduct]);

	const handleCartButtonPress = (force=false) => () => {
		try {
			if (checkProductRules(product)) {
				const sanitizedProduct = sanitizeCartData({ ...product, quantity });
				addCartItem({ variables: { force, data: sanitizedProduct } })
					.then(()=>{
						resetProduct();
						Toast.show('Produto adicionado à cesta');
					})
					.catch((err)=>{
						const message = getErrorMessage(err);
						if (message === 'CartCompanyError')
							Alert.alert(
								'Já existem itens de outro estabelecimento na sua cesta.',
								'Quer mesmo limpar sua cesta e adicionar esse item?',
								[
									{ text: 'Sim', onPress: ()=>handleCartButtonPress(true)() },
									{ text: 'Cancelar' },
								]
							);
						else Alert.alert(message);
					})
			}
		} catch (err) {
			Alert.alert(err.message);
		}
	}

	if (productError) return <ErrorBlock error={getErrorMessage(productError)} />

	return (
		<Container>
			<ProductContainer>
				<HeaderContainer>
					<HeaderImageBackgroundContainer source={{ uri: productImage }}>
						<LinearGradient
							colors={['#0000', '#000f']}
							style={{ justifyContent: 'flex-end', paddingTop: 45, paddingBottom: 60, paddingHorizontal: 35 }}
						>
							{Boolean(!loadingProduct && product) && <View style={{ flexDirection: 'row' }}>
								{/* <IconButton icon={{ name: 'share-2', color: 'white' }} onPress={handleShare} /> */}
								<FavoriteButton product={product} />
							</View>}
							
							{Boolean(product?.sale?.progress) && <Chip label='PROMOÇÃO' style={{ root: { height: 33, marginTop: 5 } }} color='secondary' />}

							<Typography style={{ marginBottom: 10, fontSize: 24, color: '#fff', fontWeight: 'bold', textShadowColor: '#000c', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 12 }}>{productName}</Typography>

							<Typography style={{ color: 'white', textShadowColor: '#000a', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 8 }}>{product?.description || productDescription}</Typography>
						</LinearGradient>
					</HeaderImageBackgroundContainer>
				</HeaderContainer>
				{Boolean(!loadingProduct && product?.company) && <CompanyPanel company={product.company} />}
				<Paper>
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
									textAlignVertical='top'
									multiline
									numberOfLines={8}
								/>
							</>
						)
					}

				</Paper>


				{!loadingProduct && <Paper style={{ backgroundColor: '#111' }}>
					<QuantityContainer>
						<QuantityTitle>Quantidade</QuantityTitle>

						<TouchableOpacity
							disabled={loadingAddToCart}
							onPress={()=>{
								if (quantity > 1) setQuantity(quantity - 1);
							}}
						>
							<Icon name='minus-circle' color='#fff' />
						</TouchableOpacity>
					
						<Quantity>{quantity.toString()}</Quantity>

						<TouchableOpacity
							disabled={loadingAddToCart}
							onPress={()=> {
								setQuantity(quantity + 1);
							}}
						>
							<Icon name='plus-circle' color='#fff' />
						</TouchableOpacity>
					</QuantityContainer>
					<CartButton disabled={loadingAddToCart} title='Adicionar à cesta' forceShowPrice onPress={handleCartButtonPress(false)} price={totalPrice} icon='shopping-bag' />
				</Paper>}
			</ProductContainer>

		</Container>
	);
}
