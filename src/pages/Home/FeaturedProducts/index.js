import React from 'react';
import { vw, vh } from 'react-native-expo-viewport-units';
import Carousel from 'react-native-snap-carousel';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { getErrors } from '../../../utils/errors';
import Product from './Product';

import { GET_CATEGORY_PRODUCTS } from '../../../graphql/products';

const carouselConfig = {
	sliderWidth: vw(100),
	sliderHeight: vh(30),
	itemWidth: vw(80),
	itemHeight: vh(25),
}

export default function FeaturedProduct() {
	const { data: { category: { products = [] } = {} } = {}, error, loading: loadingProducts } = useQuery(GET_CATEGORY_PRODUCTS, { variables: { id: 1 } });

	if (loadingProducts) return <LoadingBlock />
	if (error) return <ErrorBlock error={getErrors(error)} />

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