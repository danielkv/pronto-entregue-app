import React, { useState, useRef } from 'react';
import { vw, vh } from 'react-native-expo-viewport-units';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { useTheme } from '../../../react-native-ui';
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
	const theme = useTheme();
	const carouselRef = useRef();
	const [activeSlide, setActiveSlide] = useState(0);
	const { data: { category: { products = [] } = {} } = {}, error, loading: loadingProducts } = useQuery(GET_CATEGORY_PRODUCTS, { variables: { id: 1 } });

	if (loadingProducts) return <LoadingBlock />
	if (error) return <ErrorBlock error={getErrors(error)} />

	return (
		<>
			<Carousel
				data={products}
				renderItem={({ item }) => <Product item={item} config={carouselConfig}/>}
				onSnapToItem={(slideIndex) => {setActiveSlide(slideIndex)}}
				ref={carouselRef}

				sliderWidth={carouselConfig.sliderWidth}
				sliderHeight={carouselConfig.sliderHeight}
				itemWidth={carouselConfig.itemWidth}
				itemHeight={carouselConfig.itemHeight}
			/>
			<Pagination
				dotsLength={products.length}
				activeDotIndex={activeSlide}
				containerStyle={{
					paddingVertical: 0,
					marginTop: 15
				}}
				dotContainerStyle={{
					marginHorizontal: 0
				}}

				dotColor={theme.palette.primary.main}
				inactiveDotColor={theme.palette.default.main}

				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					marginHorizontal: 8
				}}
			/>
		</>
	);
}
