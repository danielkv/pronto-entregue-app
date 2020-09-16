import React, { useState } from 'react';
import { Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import { useLoggedUserId } from '../../../controller/hooks';
import { IconButton, useTheme } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';

import { ADD_FAVORITE_PRODUCT, REMOVE_FAVORITE_PRODUCT } from '../../../graphql/products';

// import { Container } from './styles';

export default function FavoriteButton({ product }) {
	const loggedUserId = useLoggedUserId();
	const navigation = useNavigation();
	const { palette } = useTheme();
	const [favorite, setFavorite] = useState(()=>product.favorite);

	const params = {
		productId: product.id,
		productName: product.name,
		productImage: product.image
	}

	const [addFavoriteProduct, { loading: loadingAddFavorite }] = useMutation(ADD_FAVORITE_PRODUCT, { variables: { productId: product.id, userId: loggedUserId } });
	const [removeFavoriteProduct, { loading: loadingRemoveFavorite }] = useMutation(REMOVE_FAVORITE_PRODUCT, { variables: { productId: product.id, userId: loggedUserId } });

	const style = favorite ? {} : {
		button: {
			backgroundColor: '#fff',
		}
	}

	const handlePressFavorite = (newStatus) => () => {
		try {
			if (loggedUserId) {
				if (newStatus) {
					addFavoriteProduct()
						.then(()=>setFavorite(true))
				} else {
					removeFavoriteProduct()
						.then(()=>setFavorite(false))
				}
			} else {
				Alert.alert(
					'Para favoritar um produto, você tem que estar logado.',
					'Quer fazer isso agora?',
					[
						{ text: 'Sim', onPress: ()=>navigation.navigate('LoginScreen', { redirect: 'ProductScreen', redirectParams: params }) },
						{ text: 'Não' }
					]
				);
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
