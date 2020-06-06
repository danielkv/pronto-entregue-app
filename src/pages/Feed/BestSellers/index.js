import React from 'react';

import { Paper, Typography } from '../../../react-native-ui';
import BestSellerItem from './BestSellerItem';
import { ItemsContainer } from './styles';

export default function BestSellers({ products }) {

	return (
		<Paper>
			<Typography variant='h1' style={{ marginBottom: 20 }}>Mais procurados</Typography>
			
			<ItemsContainer>
				{products.map((item) => <BestSellerItem key={item.id} item={item} />)}
			</ItemsContainer>
		</Paper>
	);
}
