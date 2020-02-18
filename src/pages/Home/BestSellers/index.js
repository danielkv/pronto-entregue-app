import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import { Paper, Typography } from '../../../react-native-ui';
import BestSellerItem from './BestSellerItem';
import { ItemsContainer } from './styles';

import { GET_BEST_SELLERS } from '../../../graphql/products'

export default function BestSellers() {
	const { data: { bestSellers: products = [] } = {} } = useQuery(GET_BEST_SELLERS, { variables: { limit: 8 } });

	return (
		<Paper>
			<Typography variant='h1' style={{ marginBottom: 20 }}>Mais vendidos</Typography>
			
			<ItemsContainer>
				{products.map((item) => <BestSellerItem key={item.id} item={item} />)}
			</ItemsContainer>
		</Paper>
	);
}