import React, { useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks';
import SideSwipe from 'react-native-sideswipe';

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
	CategoryTitle
} from './styles';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';
import { LOAD_FETURED_PRODUCTS } from '../../graphql/products';
import { GET_SELECTED_BRANCH } from '../../graphql/branches';
import { GET_BRANCH_CATEGORIES } from '../../graphql/categories';
import logoResource from '../../assets/images/logo-copeiro.png';
import FeaturedProduct from './FeaturedProduct';

// LIMIT OF FEATURED PRODUCTS
const featuredLimit = 5;

export default function Home({ navigation }) {
	const [featuredIndex, setFeaturedIndex] = useState(0);
	const { data: selectedBranchData } = useQuery(GET_SELECTED_BRANCH);
	// eslint-disable-next-line max-len
	const { data: categoriesData, loading: loadingCategories } = useQuery(GET_BRANCH_CATEGORIES, { variables: { id: selectedBranchData.selectedBranch } });

	const {
		data: featuredProductData,
		loading: loadingFeaturedProduct,
		error: featuredError
	} = useQuery(LOAD_FETURED_PRODUCTS, { variables: { limit: featuredLimit } });
	
	const renderCategory = ({ item: { id, name, image } }) => {
		return (
			<Category onPress={()=>{ navigation.navigate('CategoryScreen', { category_id: id, headerTitle: name }) }}>
				<CategoryImage source={{ uri: image }} />
				<CategoryTitle>{name}</CategoryTitle>
			</Category>
		);
	}
	
	if (loadingFeaturedProduct || loadingCategories) return <LoadingBlock />;
	if (featuredError) return <ErrorBlock error={featuredError} />;
	
	const { featuredProducts } = featuredProductData;
	const { categories } = categoriesData.branch;

	const { width } = Dimensions.get('window');
	// const contentOffset = width / 2;
	
	return (
		<Container>
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
