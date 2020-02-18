import React from 'react';
import { RefreshControl } from 'react-native';
import { Image } from 'react-native-elements';

import logoResource from '../../assets/images/logo-vertical-v2.png';
import BestSellers from './BestSellers'
import FeaturedProducts from './FeaturedProducts';
import {
	Container,
	Footer,
} from './styles';

export default function Home() {
	/* const [refreshing, setRefreshing] = useState(false);
	
	const onRefresh = useCallback(()=>{
		refetchFeaturedProducts();
		refetchCategories();
		setRefreshing(true);
	}, [refreshing]); */
	
	return (
		<Container
			refreshControl={
				<RefreshControl />
			}
		>
			<FeaturedProducts />
			<BestSellers />

			<Footer>
				<Image source={logoResource} />
			</Footer>
		</Container>
	);
}
