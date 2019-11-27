import React from 'react';
import { View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks';

import {
	Container,
	ImageLogo,
	Footer,
	HeaderContainer,
	CategoriesContainer,
	Categories,
	FeaturedProductContainer,
	FeaturedProductTitle,
	FeaturedProductSubtitle,
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

// LIMIT OF FEATURED PRODUCTS
const featuredLimit = 5;

export default function Home({ navigation }) {
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
	
	const featuredProduct = featuredProductData.featuredProducts.length ? featuredProductData.featuredProducts[0] : null;
	const { categories } = categoriesData.branch;
	
	return (
		<Container>
			<HeaderContainer onPress={()=>{}}>
				<FeaturedProductContainer source={{ uri: featuredProduct.image }}>
					<LinearGradient
						colors={['rgba(255,124,3,0)', 'rgba(255,124,3,1)']}
						style={{ justifyContent: 'flex-end', paddingTop: 30, paddingBottom: 20 }}
					>
						<FeaturedProductTitle h2>{featuredProduct.name}</FeaturedProductTitle>
						{!!featuredProduct.price && (
							<FeaturedProductSubtitle h3>
								{`a partir de R$ ${featuredProduct.price.toFixed(2).replace('.', ',')}`}
							</FeaturedProductSubtitle>
						)}
					</LinearGradient>

				</FeaturedProductContainer>
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
