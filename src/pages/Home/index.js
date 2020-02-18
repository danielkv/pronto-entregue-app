import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, Dimensions, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import SideSwipe from 'react-native-sideswipe';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import logoResource from '../../assets/images/logo-vertical-v2.png';
import FeaturedProduct from './FeaturedProduct';
import {
	Container,
	ImageLogo,
	Footer,
	HeaderContainer,
	CategoriesContainer,
	Categories,
	CategoriesTitle,
	Category,
	CategoryImage,
	CategoryTitle,
	CategoryTitleContainer
} from './styles';

import { GET_BRANCH_CATEGORIES } from '../../graphql/categories';
import { LOAD_BRANCH_FETURED_PRODUCTS } from '../../graphql/products';

// LIMIT OF FEATURED PRODUCTS
// const featuredLimit = 5;

export default function Home({ navigation }) {
	const [featuredIndex, setFeaturedIndex] = useState(0);
	const [refreshing, setRefreshing] = useState(false);

	// const fetchPolicy = refreshing ? 'networt-only' : 'cache-fisrt';
	
	// eslint-disable-next-line max-len
	/* const {
		data: categoriesData,
		loading: loadingCategories,
		refetch: refetchCategories
	} = useQuery(GET_BRANCH_CATEGORIES, { variables: { id: selectedBranchData.selectedBranch }, fetchPolicy });
	const {
		data: featuredProductData,
		loading: loadingFeaturedProduct,
		error: featuredError,
		refetch: refetchFeaturedProducts,
	} = useQuery(LOAD_BRANCH_FETURED_PRODUCTS, { variables: { id: selectedBranchData.selectedBranch, limit: featuredLimit }, fetchPolicy }); */
	
	const renderCategory = ({ item: { id, name, image } }) => {
		return (
			<Category onPress={()=>{ navigation.navigate('CategoryScreen', { category_id: id }) }}>
				<CategoryImage source={{ uri: image }} />
				<CategoryTitleContainer>
					<CategoryTitle>{name}</CategoryTitle>
				</CategoryTitleContainer>
			</Category>
		);
	}
	
	const onRefresh = useCallback(()=>{
		refetchFeaturedProducts();
		refetchCategories();
		setRefreshing(true);
	}, [refreshing]);

	/* useEffect(()=>{
		if (loadingCategories && loadingFeaturedProduct && refreshing) setRefreshing(false);
	}, [loadingCategories, loadingFeaturedProduct, refreshing])
	
	if (!refreshing && (loadingFeaturedProduct || loadingCategories)) return <LoadingBlock />;
	if (featuredError) return <ErrorBlock error={featuredError} />;
	
	const { featuredProducts } = featuredProductData.branch;
	const { categories } = categoriesData.branch;
	const { width } = Dimensions.get('window'); */
	
	return (
		<Container
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<HeaderContainer onPress={()=>{}}>
				<SideSwipe
					index={featuredIndex}
					itemWidth={width}
					style={{ width, height: '100%' }}
					data={featuredProducts}
					contentOffset={0}
					onIndexChange={index =>	setFeaturedIndex(index)}
					renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
						<FeaturedProduct key={itemIndex} currentIndex={currentIndex} product={item} animatedValue={animatedValue} />
					)}
				/>
			</HeaderContainer>

			<CategoriesContainer>
				<View>
					<CategoriesTitle h2>Mais produtos</CategoriesTitle>
					<Icon type='material-community' name='chevron-down' size={14} color='#fff' />
				</View>
				<Categories>
					<FlatList
						data={categories}
						renderItem={renderCategory}
						keyExtractor={(item)=>item.id}
						numColumns={2}
					/>
				</Categories>
			</CategoriesContainer>
			<Footer>
				<ImageLogo source={logoResource} />
			</Footer>
	
		</Container>
	);
}
