import React from 'react';
import { RefreshControl } from 'react-native';
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
			<UserInfo />
			<FeaturedProducts />
			<BestSellers />

			<Footer>
				<Image source={logoResource} resizeMode='contain' style={{ height: 130, width: 150 }} />
			</Footer>
		</Container>
	);
}
