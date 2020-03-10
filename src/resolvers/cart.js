import { uniqueId } from 'lodash';

import { CartCompanyError } from '../utils/errors';

import { GET_SELECTED_ADDRESS, SET_SELECTED_ADDRESS } from '../graphql/addresses';
import { GET_CART_ITEMS, GET_CART_DELIVERY, GET_CART_PAYMENT, GET_CART, GET_CART_COMPANY } from '../graphql/cart';
import { CALCULATE_DELIVERY_PRICE } from '../graphql/orders';

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
					cartItems: [],
					cartPrice: 0
				}
			});
		},
		addCartItem: (_, { data, force = false }, { cache }) => {
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
		setDelivery: async (_, { type, address }, { cache, client }) => {
			const delivery = { type };
			
			if (type === 'delivery') {
				delete address.__typename;
				await client.mutate({ mutation: SET_SELECTED_ADDRESS, variables: { address } });
				
				const { cartCompany } = cache.readQuery({ query: GET_CART_COMPANY });
				
				delete address.__typename;
				const { data: deliveryPriceData, error } = await client.mutate({
					mutation: CALCULATE_DELIVERY_PRICE,
					variables: { companyId: cartCompany.id, address }
				});
				
				delivery.price = deliveryPriceData.calculateDeliveryPrice.price;
				if (error) throw error;
			} else {
				delivery.price = 0;
			}

			delivery.__typename = 'Delivery';
			delivery.id = uniqueId();

			cache.writeQuery({ query: GET_CART_DELIVERY, data: { cartDelivery: delivery } });

			return null;
		},
		setPayment: (_, { data }, { cache }) => {
			data.__typename = 'Payment';
			data.price = 0;

			cache.writeData({ query: GET_CART_PAYMENT, data: { cartPayment: data } });

			return null;
		},
		
	}
}