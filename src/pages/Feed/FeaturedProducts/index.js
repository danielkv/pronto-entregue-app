import React, { useState, useRef } from 'react';
import { vw, vh } from 'react-native-expo-viewport-units';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../components/ErrorBlock';
import LoadingBlock from '../../../components/LoadingBlock';

import { useTheme, Paper, Typography } from '../../../react-native-ui';
import { getErrors } from '../../../utils/errors';
import { useSelectedAddress } from '../../../utils/hooks';
import FeaturedItem from './FeaturedItem';

import { GET_PRODUCTS_ON_SALE } from '../../../graphql/products';

const carouselConfig = {
	sliderWidth: vw(100),
	sliderHeight: vh(30),
	itemWidth: vw(100)-70,
	itemHeight: vh(28),
}

export default function FeaturedProduct() {
	const theme = useTheme();
	const carouselRef = useRef();
	const [activeSlide, setActiveSlide] = useState(0);
	
	const { location } = useSelectedAddress();
	const { data: { productsOnSale: products = [] } = {}, error, loading: loadingProducts } = useQuery(GET_PRODUCTS_ON_SALE, { variables: { limit: 5, location }, fetchPolicy: 'no-cache' });

	if (loadingProducts) return <LoadingBlock />
	if (error) return <ErrorBlock error={getErrors(error)} />
	if (!products.length) return false;

	return (
		<Paper style={{ paddingHorizontal: 0 }}>
			<Typography variant='h1' style={{ marginLeft: 35, marginBottom: 20 }}>Destaques</Typography>
			<Carousel
				data={products}
				renderItem={({ item }) => <FeaturedItem item={item} config={carouselConfig}/>}
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
				inactiveDotColor={theme.palette.background.dark}

				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					marginHorizontal: 8
				}}
			/>
		</Paper>
	);
}
