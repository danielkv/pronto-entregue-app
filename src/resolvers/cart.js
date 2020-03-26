import { uniqueId } from 'lodash';

import { CartCompanyError, extractFirstError } from '../utils/errors';

import { SET_SELECTED_ADDRESS } from '../graphql/addresses';
import { GET_CART_ITEMS, GET_CART_DELIVERY, GET_CART_PAYMENT, GET_CART, GET_CART_COMPANY, CHECK_DELIVERY_LOCATION } from '../graphql/cart';

/* eslint-disable no-underscore-dangle */

export default {
	Query: {
		
	},
	Mutation: {
		// eslint-disable-next-line consistent-return
		cancelCart: (_, __, { cache }) => {
			cache.writeData({
				data: {
					cartMessage: '',
					cartCompany: null,
					cartDelivery: null,
					cartPayment: null,
					cartItems: [],
					cartPrice: 0
				}
			});
		},
		addCartItem: (_, { data, force = false }, { cache }) => {
			// get cart
			const { cartItems, cartCompany } = cache.readQuery({ query: GET_CART });
			
			// check company
			const company = data.company;
			if ((cartCompany !== null && cartCompany?.id !== company.id) && !force) {
				throw new CartCompanyError('CartCompanyError');
			}

			const newCart = force ? [data] : cartItems.concat(data);

			// set cart company
			cache.writeQuery({ query: GET_CART_COMPANY, data: { cartCompany: company } })
			
			// set cart items
			cache.writeQuery({ query: GET_CART_ITEMS, data: { cartItems: newCart } });

			return null;
		},
		removeCartItem: (_, { id }, { cache }) => {
			const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
			
			const removeIndex = cartItems.findIndex(item => item.id === id);
			cartItems.splice(removeIndex, 1);

			cache.writeQuery({ query: GET_CART_ITEMS, data: { cartItems } });

			return null;
		},
		setDelivery: async (_, { type, address, force=false }, { cache, client }) => {
			try {
				const delivery = { type };
			
				if (type === 'delivery') {
					delete address.__typename;
					await client.mutate({ mutation: SET_SELECTED_ADDRESS, variables: { address, force } });
				
					const { cartCompany } = cache.readQuery({ query: GET_CART_COMPANY });

					if (!cartCompany) throw new Error('Nenhum item no carrinho');
				
					delete address.__typename;
					const { data: { checkDeliveryLocation }, error } = await client.mutate({
						mutation: CHECK_DELIVERY_LOCATION,
						variables: { companyId: cartCompany.id, address }
					})
				
					delivery.price = checkDeliveryLocation.price;
					if (error) throw error;
				} else {
					delivery.price = 0;
				}

				delivery.__typename = 'Delivery';
				delivery.id = uniqueId();

				cache.writeQuery({ query: GET_CART_DELIVERY, data: { cartDelivery: delivery } });

			} catch(err) {
				throw new Error(JSON.stringify(extractFirstError(err)));
			}
		},
		setPayment: (_, { data }, { cache }) => {
			data.__typename = 'Payment';
			cache.writeQuery({ query: GET_CART_PAYMENT, data: { cartPayment: data } });

			return null;
		},
		
	}
}