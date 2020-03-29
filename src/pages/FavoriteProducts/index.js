import React, { Fragment } from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';
import ProductItem from '../../components/ProductItem';

import { Paper, Typography, Divider } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';
import { useLoggedUserId } from '../../utils/hooks';

import { GET_USER_FAVORITE_PRODUCTS } from '../../graphql/users';

// import { Container } from './styles';

export default function FavoriteProducts() {
	const loggedUserId = useLoggedUserId();
	const { data: { user: { favoriteProducts = [] } = {} } = {}, loading: loadingFavoriteProducts, error: favoriteProductsError } = useQuery(GET_USER_FAVORITE_PRODUCTS, { variables: { id: loggedUserId }, fetchPolicy: 'cache-and-network' });

	if (favoriteProductsError) return <ErrorBlock error={getErrorMessage(favoriteProductsError)} />;

	return (
		<Paper>
			<Typography variant='title' stye>Produtos favoritos</Typography>
			<View style={{ marginTop: 25 }}>
				{loadingFavoriteProducts
					? <LoadingBlock />
					: !favoriteProducts.length
						? <Typography variant='subtitle'>Você não tem nenhum produto favorito ainda</Typography>
						: favoriteProducts.map((product, index) => (
							<Fragment key={product.id}>
								{index > 0 && <Divider />}
								<ProductItem item={product} />
							</Fragment>
						))
				}
			</View>
		</Paper>
	);
}
