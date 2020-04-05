import React, { useState, useRef } from 'react';
import { vw, vh } from 'react-native-expo-viewport-units';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { useTheme, Paper, Typography } from '../../../react-native-ui';
import FeaturedItem from './FeaturedItem';

const carouselConfig = {
	sliderWidth: vw(100),
	sliderHeight: vh(30),
	itemWidth: vw(100)-70,
	itemHeight: vh(28),
}

export default function FeaturedProduct({ products }) {
	const theme = useTheme();
	const carouselRef = useRef();
	const [activeSlide, setActiveSlide] = useState(0);
	
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
