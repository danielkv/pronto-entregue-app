import React, { useState } from 'react';
import { Image, ScrollView, RefreshControl, View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import logoResource from '../../assets/images/logo-simbolo.png';
import { useSelectedAddress } from '../../controller/hooks';
import { useTheme, Button } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import BestSellers from './BestSellers'
import Companies from './Companies';
import FeaturedProducts from './FeaturedProducts';
import SearchBox from './SearchBox';
import Sections from './Sections';
import { Footer } from './styles';
import UserInfo from './UserInfo';

import { LOAD_FEED } from '../../graphql/products';

export default function Feed() {
	const navigation = useNavigation();
	const { location = null } = useSelectedAddress();
	const { palette } = useTheme();
	const [refreshing, setRefreshing] = useState(false);

	const { data: { productsOnSale = [], bestSellers = [], companies = [] } = {}, error: feedError, loading: loadingFeed, refetch } = useQuery(LOAD_FEED, { variables: { onSaleLimit: 5, bestSellersLimit: 8, location, pagination: { page: 0, rowsPerPage: 6 } }, fetchPolicy: 'no-cache' });

	const feedIsEmpty = !productsOnSale.length && !bestSellers.length;

	function handleRefresh() {
		setRefreshing(true);
		refetch()
			.finally(()=>setRefreshing(false));
	}

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					enabled={!loadingFeed}
					tintColor={palette.primary.main}
					colors={[palette.primary.main]}
					refreshing={refreshing}
					onRefresh={handleRefresh}
				/>}
		>
			<UserInfo />

			{loadingFeed && feedIsEmpty
				? feedError ? <ErrorBlock error={getErrorMessage(feedError)} /> : <LoadingBlock />
				: (
					<>
						<Sections />
						<FeaturedProducts products={productsOnSale} />
						<Companies companies={companies} />
						<SearchBox />
						<BestSellers products={bestSellers} />
					</>
				)
			}
			
			<Footer>
				<View style={{ marginBottom: 25 }}>
					<Button icon='message-circle' variant='outlined' onPress={()=>navigation.navigate('SuggestCompany')} color='primary'>Indique um estabelecimento</Button>
				</View>
				<Image source={logoResource} resizeMode='contain' style={{ height: 130, width: 150 }} />
			</Footer>
		</ScrollView>
	);
}
