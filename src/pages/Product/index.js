import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, TouchableOpacity, View, RefreshControl } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { cloneDeep } from 'lodash';

import CartButton from '../../components/CartButton';
import CompanyPanel from '../../components/CompanyPanel';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import Toast from '../../components/Toast';

import { useSelectedAddress } from '../../controller/hooks';
import { calculateProductPrice, checkProductRules, sanitizeCartData } from '../../controller/products';
import { Paper, Typography, Icon, TextField, useTheme, Chip } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import FavoriteButton from './FavoriteButton';
import Inline from './Inline';
import Panel from './Panel';
import {
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
	const { location = null } = useSelectedAddress();
	const [refreshing, setRefreshing] = useState(false);

	const [message, setMessage] = useState('');
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [addCartItem, { loadingAddToCart }] = useMutation(ADD_CART_ITEM);

	const totalPrice = useMemo(()=>{
		if (product) return calculateProductPrice(product, true) * quantity;

		return 0;
	}, [product, calculateProductPrice, quantity]);

	const { data: productData, loading: loadingProduct, error: productError, refetch } = useQuery(LOAD_PRODUCT, { variables: { id: productId, location } });

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
		// sanitize product data 
		const sanitizedProduct = sanitizeCartData({ ...product, message, quantity });
		
		try {
			if (checkProductRules(product, force)) {
				// Add cart Item
				addCartItem({ variables: { data: sanitizedProduct } })
					.then(()=>{
						resetProduct();
						Toast.show('Produto adicionado à cesta');
					})
			}
		} catch (err) {
			if (err.type === 'CartValidationError')
				Alert.alert(err.title, err.message, [
					{ text: 'Sim', onPress: ()=>handleCartButtonPress(true)() },
					{ text: 'Cancelar' },
				]);
			else
				Alert.alert('Não é possivel adicionar esse item à cesta', getErrorMessage(err.message));
		}
	}

	function onRefresh() {
		setRefreshing(true);
		refetch()
			.finally(()=>setRefreshing(false));
	}

	if (productError) return <ErrorBlock error={getErrorMessage(productError)} />

	return (
		<ProductContainer
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={refreshing} onRefresh={onRefresh} />}
		>
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
							
						{Boolean(product?.sale?.progress) && <Chip label='PROMOÇÃO' style={{ root: { height: 30, marginTop: 8 }, text: { fontSize: 14 } }} color='secondary' />}

						<Typography style={{ marginTop: 4, fontSize: 22, color: '#fff', fontFamily: 'Roboto-Bold', textShadowColor: '#000c', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 12 }}>{productName}</Typography>

						<Typography style={{ marginTop: 3, color: 'white', textShadowColor: '#000a', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 8 }}>{product?.description || productDescription}</Typography>

						{product?.scheduleEnabled && <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
							<Icon name='info' color='#EFCA2E' style={{ root: { margin: 0, marginRight: 10 } }}/>
							<Typography style={{ fontSize: 12, color: '#EFCA2E' }}>Esse produto é apenas para encomenda, você pode agendar e receber em casa</Typography>
						</View>}
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
								onChangeText={(text)=>setMessage(text)}
								value={message}
								textAlignVertical='top'
								multiline
								numberOfLines={8}
							/>
						</>
					)
				}

			</Paper>


			{Boolean(!loadingProduct || product) && <Paper style={{ backgroundColor: '#111' }}>
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
				<CartButton disabled={loadingAddToCart || refreshing} title='Adicionar à cesta' forceShowPrice onPress={handleCartButtonPress(false)} price={totalPrice} icon='shopping-bag' />
			</Paper>}
		</ProductContainer>
	);
}
