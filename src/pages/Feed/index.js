import React from 'react';
import { Image, ScrollView, RefreshControl } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import logoResource from '../../assets/images/logo-simbolo.png';
import { useSelectedAddress } from '../../controller/hooks';
import { useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import BestSellers from './BestSellers'
import FeaturedProducts from './FeaturedProducts';
import { Footer } from './styles';
import UserInfo from './UserInfo';

import { LOAD_FEED } from '../../graphql/products';

export default function Feed() {
	const { location=null } = useSelectedAddress();
	const { palette } = useTheme();
	const { data: { productsOnSale = [], bestSellers = [] } = {}, error: feedError, loading: loadingFeed, refetch } = useQuery(LOAD_FEED, { variables: { onSaleLimit: 5, bestSellersLimit: 8, location }, fetchPolicy: 'no-cache' });

	const feedIsEmpty = !productsOnSale.length && !bestSellers.length;

	return (
		<ScrollView
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={loadingFeed && !feedIsEmpty} onRefresh={()=>refetch()} />}
		>
			<UserInfo />

			{loadingFeed && feedIsEmpty
				? feedError ? <ErrorBlock error={getErrorMessage(feedError)} /> : <LoadingBlock />
				: (
					<>
						<FeaturedProducts products={productsOnSale} />
						<BestSellers products={bestSellers} />
					</>
				)
			}
			
			<Footer>
				<Image source={logoResource} resizeMode='contain' style={{ height: 130, width: 150 }} />
			</Footer>
		</ScrollView>
	);
}
