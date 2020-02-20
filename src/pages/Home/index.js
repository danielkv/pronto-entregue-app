import React from 'react';
import { Image } from 'react-native-elements';

import logoResource from '../../assets/images/logo-simbolo.png';
import BestSellers from './BestSellers'
import FeaturedProducts from './FeaturedProducts';
import {
	Container,
	Footer,
} from './styles';
import UserInfo from './UserInfo';

export default function Home() {
	return (
		<Container
			scrollEventThrottle={16}
		>
			<UserInfo />
			<FeaturedProducts />
			<BestSellers />

			<Footer>
				<Image source={logoResource} resizeMode='contain' style={{ height: 130, width: 150 }} />
			</Footer>
		</Container>
	);
}
