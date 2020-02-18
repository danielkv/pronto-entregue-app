import React from 'react';
import { TouchableOpacity } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import Carousel from 'react-native-snap-carousel';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';
// import { LinearGradient } from 'expo-linear-gradient';

import { getEffectiveTypeParameterDeclarations } from 'typescript';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { getErrors } from '../../../utils/errors';
import Product from './Product';
import { Container, ProductTitle, ProductSubtitle } from './styles';

import { GET_CATEGORY_PRODUCTS } from '../../../graphql/products';

{/* <Container source={{ uri: image }}>
		<TouchableOpacity onPress={()=>navigation.navigate('ProductScreen', { product_id: id })}>
		<LinearGradient
				colors={['rgba(255,124,3,0)', 'rgba(255,124,3,1)']}
				style={{ justifyContent: 'flex-end', paddingTop: 30, paddingBottom: 20 }}
		>
				<ProductTitle h2>{name}</ProductTitle>
				{!!price && (
				<ProductSubtitle h3>
					{`a partir de R$ ${price.toFixed(2).replace('.', ',')}`}
				</ProductSubtitle>
			)}
			</LinearGradient>
	</TouchableOpacity>
	</Container> */}

const carouselConfig = {
	sliderWidth: vw(100),
	sliderHeight: vh(30),
	itemWidth: vw(80),
	itemHeight: vh(25),
}

export default function FeaturedProduct() {
	const navigation = useNavigation();

	const { data: { category: { products = [] } = {} } = {}, error, loading: loadingProducts } = useQuery(GET_CATEGORY_PRODUCTS, { variables: { id: 1 } });

	if (loadingProducts) return <LoadingBlock />
	if (error) return <ErrorBlock error={getErrors(error)} />

	console.log(products);

	return (
		<Carousel
			data={products}
			renderItem={({ item }) => <Product item={item} config={carouselConfig}/>}

			sliderWidth={carouselConfig.sliderWidth}
			sliderHeight={carouselConfig.sliderHeight}
			itemWidth={carouselConfig.itemWidth}
			itemHeight={carouselConfig.itemHeight}
		/>
		
	);
}
