import React from 'react';
import { Image, ScrollView, RefreshControl } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import logoResource from '../../assets/images/logo-simbolo.png';
import { useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import { useSelectedAddress } from '../../utils/hooks';
import BestSellers from './BestSellers'
import FeaturedProducts from './FeaturedProducts';
import { Footer } from './styles';
import UserInfo from './UserInfo';

import { LOAD_FEED } from '../../graphql/products';

export default function Feed() {
	const { location } = useSelectedAddress();
	const { palette } = useTheme();
	const { data: { productsOnSale = [], bestSellers = [] } = {}, error: feedError, loading: loadingFeed, refetch, called } = useQuery(LOAD_FEED, { variables: { onSaleLimit: 5, bestSellersLimit: 8, location }, fetchPolicy: 'no-cache' });

	return (
		<ScrollView
			refreshControl={<RefreshControl tintColor={palette.primary.main} colors={[palette.primary.main]} refreshing={loadingFeed && called} onRefresh={()=>refetch()} />}
		>
			<UserInfo />

			{loadingFeed && (!productsOnSale.length && !bestSellers.length)
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
