import { GET_CART_ITEMS } from '../graphql/cart';

/* eslint-disable no-underscore-dangle */

export default {
	Query: {
		
	},
	Mutation: {
		// eslint-disable-next-line consistent-return
		addCartItem: (_, { data }, { cache }) => {
			const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
			
			const new_cart = cartItems.concat(data);

			cache.writeQuery({ query: GET_CART_ITEMS, data: { cartItems: new_cart } });

			return null;
		},
		
	}
}