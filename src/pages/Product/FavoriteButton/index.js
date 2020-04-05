import React, { useState } from 'react';
import { Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';

import { IconButton, useTheme } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';
import { useLoggedUserId } from '../../../utils/hooks';

import { ADD_FAVORITE_PRODUCT, REMOVE_FAVORITE_PRODUCT } from '../../../graphql/products';

// import { Container } from './styles';

export default function FavoriteButton({ product }) {
	const loggedUserId = useLoggedUserId();
	const { palette } = useTheme();
	const [favorite, setFavorite] = useState(()=>product.favorite);

	const [addFavoriteProduct, { loading: loadingAddFavorite }] = useMutation(ADD_FAVORITE_PRODUCT, { variables: { productId: product.id, userId: loggedUserId } });
	const [removeFavoriteProduct, { loading: loadingRemoveFavorite }] = useMutation(REMOVE_FAVORITE_PRODUCT, { variables: { productId: product.id, userId: loggedUserId } });

	const style = favorite ? {} : {
		button: {
			backgroundColor: '#fff',
		}
	}

	const handlePressFavorite = (newStatus) => () => {
		try {
			if (newStatus) {
				addFavoriteProduct()
					.then(()=>setFavorite(true))
			} else {
				removeFavoriteProduct()
					.then(()=>setFavorite(false))
			}
		} catch (err) {
			Alert.alert(getErrorMessage(err));
		}
	}
	return (
		<IconButton
			disabled={loadingAddFavorite || loadingRemoveFavorite}
			onPress={handlePressFavorite(!favorite)}
			variant='filled'
			color='primary'
			style={style}
			icon={{ name: 'heart', color: favorite ? 'white' : palette.primary.main }} />
	);
}
